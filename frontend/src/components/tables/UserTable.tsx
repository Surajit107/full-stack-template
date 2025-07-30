import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Loading, TableSkeleton } from '@/components/ui/loading';
import { User } from '@/types/user';
import { Edit, Trash2, User as UserIcon, Eye, Power, PowerOff, Users, Sparkles } from 'lucide-react';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onViewDetails: (user: User) => void;
  onToggleStatus: (user: User) => void;
  isLoading?: boolean;
}

export function UserTable({
  users,
  onEdit,
  onDelete,
  onViewDetails,
  onToggleStatus,
  isLoading = false
}: UserTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const safeUsers = Array.isArray(users) ? users : [];

  // Loading state
  if (isLoading) {
    return (
      <div className="rounded-md border">
        <div className="p-6">
          <TableSkeleton rows={5} columns={7} />
        </div>
      </div>
    );
  }

  // Empty state
  if (safeUsers.length === 0) {
    return (
      <div className="rounded-md border">
        <div className="flex flex-col items-center justify-center p-8 lg:p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No users found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Get started by creating a new user.
          </p>
          <Button size="sm" className="group">
            <UserIcon className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
            Add User
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader className="sticky top-0 bg-background z-10">
          <TableRow className="hover:bg-muted/50 transition-colors">
            <TableHead className="font-semibold">Name</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Email</TableHead>
            <TableHead className="hidden lg:table-cell font-semibold">Age</TableHead>
            <TableHead className="hidden lg:table-cell font-semibold">Bio</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="hidden md:table-cell font-semibold">Created</TableHead>
            <TableHead className="text-right font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeUsers.map((user, index) => (
            <TableRow 
              key={user._id} 
              className="hover:bg-muted/50 transition-all duration-200 group"
              style={{
                animationDelay: `${index * 50}ms`,
                animation: 'fadeInUp 0.3s ease-out forwards'
              }}
            >
              <TableCell className="font-medium">
                <div className="flex flex-col">
                  <span className="font-medium group-hover:text-primary transition-colors">{user.name}</span>
                  <span className="text-xs text-muted-foreground md:hidden">{user.email}</span>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell group-hover:text-primary transition-colors">
                {user.email}
              </TableCell>
              <TableCell className="hidden lg:table-cell">{user.age || '-'}</TableCell>
              <TableCell className="hidden lg:table-cell max-w-xs truncate group-hover:text-primary transition-colors">
                {user.bio || '-'}
              </TableCell>
              <TableCell>
                <Badge 
                  variant={user.isActive ? "default" : "secondary"}
                  className="group-hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-1">
                    {user.isActive ? (
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                    )}
                    {user.isActive ? "Active" : "Inactive"}
                  </div>
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell text-muted-foreground">
                {formatDate(user.createdAt)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1 lg:gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewDetails(user)}
                    title="View Details"
                    className="h-8 w-8 p-0 lg:h-9 lg:w-9 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-200 cursor-pointer"
                  >
                    <Eye className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(user)}
                    title="Edit User"
                    className="h-8 w-8 p-0 lg:h-9 lg:w-9 hover:bg-yellow-50 hover:border-yellow-200 hover:text-yellow-600 transition-all duration-200 cursor-pointer"
                  >
                    <Edit className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onToggleStatus(user)}
                    title={user.isActive ? "Deactivate User" : "Activate User"}
                    className={`h-8 w-8 p-0 lg:h-9 lg:w-9 transition-all duration-200 cursor-pointer ${
                      user.isActive 
                        ? "hover:bg-orange-50 hover:border-orange-200 hover:text-orange-600" 
                        : "hover:bg-green-50 hover:border-green-200 hover:text-green-600"
                    }`}
                  >
                    {user.isActive ? (
                      <PowerOff className="h-3 w-3 lg:h-4 lg:w-4" />
                    ) : (
                      <Power className="h-3 w-3 lg:h-4 lg:w-4" />
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(user)}
                    title="Delete User"
                    className="h-8 w-8 p-0 lg:h-9 lg:w-9 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-200 cursor-pointer"
                  >
                    <Trash2 className="h-3 w-3 lg:h-4 lg:w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Futuristic loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm font-medium">Loading users...</span>
          </div>
        </div>
      )}
    </div>
  );
}