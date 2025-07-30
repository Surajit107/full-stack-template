'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserTable } from '@/components/tables/UserTable';
import { UserDialog } from '@/components/dialogs/UserDialog';
import { UserDetailsDialog } from '@/components/dialogs/UserDetailsDialog';
import { ConfirmationDialog } from '@/components/dialogs/ConfirmationDialog';
import { SearchFilter } from '@/components/ui/search-filter';
import { Pagination } from '@/components/ui/pagination';
import { ClientOnly } from '@/components/ui/client-only';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { useUserStore } from '@/stores/userStore';
import { useDebounce } from '@/hooks/use-debounce';
import { User } from '@/types/user';
import { CreateUserFormData, UpdateUserFormData } from '@/lib/validations/user';
import { toast } from 'sonner';
import { Plus, RefreshCw } from 'lucide-react';

export default function UsersPage() {
  const {
    users,
    loading,
    error,
    total,
    page,
    limit,
    totalPages,
    hasNextPage,
    hasPrevPage,
    search,
    statusFilter,
    sortBy,
    sortOrder,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    setSearch,
    setStatusFilter,
    setSortBy,
    setSortOrder,
    setPage,
    clearError,
  } = useUserStore();

  // Local state for search input (debounced)
  const [searchInput, setSearchInput] = useState(search);
  const debouncedSearch = useDebounce(searchInput, 500); // 500ms debounce

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [userToView, setUserToView] = useState<User | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Fetch users when filters change
  useEffect(() => {
    const params = {
      search: debouncedSearch,
      status: statusFilter,
      sortBy,
      sortOrder,
      page,
      limit,
    };
    fetchUsers(params);
  }, [debouncedSearch, statusFilter, sortBy, sortOrder, page, limit, fetchUsers]);

  // Update search in store when debounced value changes
  useEffect(() => {
    setSearch(debouncedSearch);
  }, [debouncedSearch, setSearch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleCreateUser = async (data: CreateUserFormData) => {
    try {
      await createUser(data);
      toast.success('User created successfully');
      // Refresh the current page
      const params = {
        search: debouncedSearch,
        status: statusFilter,
        sortBy,
        sortOrder,
        page,
        limit,
      };
      fetchUsers(params);
    } catch (error) {
      toast.error('Failed to create user');
    }
  };

  const handleUpdateUser = async (data: UpdateUserFormData) => {
    if (!selectedUser) return;

    try {
      await updateUser(selectedUser._id, data);
      toast.success('User updated successfully');
    } catch (error) {
      toast.error('Failed to update user');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!userToDelete) return;

    try {
      await deleteUser(userId);
      toast.success('User deleted successfully');
      // Refresh the current page
      const params = {
        search: debouncedSearch,
        status: statusFilter,
        sortBy,
        sortOrder,
        page,
        limit,
      };
      fetchUsers(params);
    } catch (error) {
      toast.error('Failed to delete user');
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      const newStatus = !user.isActive;
      await toggleUserStatus(user._id, { isActive: newStatus });
      const action = newStatus ? 'activated' : 'deactivated';
      toast.success(`${user.name} ${action} successfully`);
    } catch (error) {
      toast.error(`Failed to update ${user.name}'s status`);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1); // Reset to first page when searching
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value as 'all' | 'active' | 'inactive');
    setPage(1); // Reset to first page when filtering
  };

  const handleSortByChange = (value: string) => {
    setSortBy(value);
    setPage(1); // Reset to first page when sorting
  };

  const handleSortOrderChange = (value: 'asc' | 'desc') => {
    setSortOrder(value);
    setPage(1); // Reset to first page when sorting
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleClearFilters = () => {
    setSearchInput('');
    setStatusFilter('all');
    setSortBy('createdAt');
    setSortOrder('desc');
    setPage(1);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleViewDetails = (user: User) => {
    setUserToView(user);
    setDetailsDialogOpen(true);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleCreateNew = () => {
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const handleDialogSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    if (selectedUser) {
      await handleUpdateUser(data as UpdateUserFormData);
    } else {
      await handleCreateUser(data as CreateUserFormData);
    }
  };

  const handleRefresh = () => {
    const params = {
      search: debouncedSearch,
      status: statusFilter,
      sortBy,
      sortOrder,
      page,
      limit,
    };
    fetchUsers(params);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-4 px-4 lg:py-8 lg:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Users</h1>
            <p className="text-muted-foreground text-sm lg:text-base">
              Manage your users and their information
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={loading}
              size="sm"
              className="flex-1 sm:flex-none"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button onClick={handleCreateNew} size="sm" className="flex-1 sm:flex-none">
              <Plus className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Add User</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg lg:text-xl">User List</CardTitle>
            <CardDescription className="text-sm">
              View and manage all users in the system
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search and Filter Component */}
            <ClientOnly>
              <SearchFilter
                search={searchInput}
                onSearchChange={handleSearchChange}
                statusFilter={statusFilter}
                onStatusFilterChange={handleStatusFilterChange}
                sortBy={sortBy}
                onSortByChange={handleSortByChange}
                sortOrder={sortOrder}
                onSortOrderChange={handleSortOrderChange}
                onClearFilters={handleClearFilters}
              />
            </ClientOnly>

            {/* Results Summary */}
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span className="text-xs sm:text-sm">
                {total} user{total !== 1 ? 's' : ''} found
                {debouncedSearch && ` matching "${debouncedSearch}"`}
                {statusFilter !== 'all' && ` (${statusFilter} only)`}
              </span>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <UserTable
                users={users}
                onEdit={handleEditUser}
                onDelete={handleDeleteClick}
                onViewDetails={handleViewDetails}
                onToggleStatus={handleToggleUserStatus}
                isLoading={loading}
              />
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={total}
                  itemsPerPage={limit}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Form Dialog */}
        <UserDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          user={selectedUser}
          onSubmit={handleDialogSubmit}
          isLoading={loading}
        />

        {/* User Details Dialog */}
        <UserDetailsDialog
          open={detailsDialogOpen}
          onOpenChange={setDetailsDialogOpen}
          user={userToView}
        />

        {/* Delete Confirmation Dialog */}
        <ConfirmationDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title="Delete User"
          description={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
          confirmText="Delete User"
          cancelText="Cancel"
          variant="destructive"
          onConfirm={() => userToDelete && handleDeleteUser(userToDelete._id)}
          isLoading={loading}
        />
      </div>
    </ProtectedRoute>
  );
}