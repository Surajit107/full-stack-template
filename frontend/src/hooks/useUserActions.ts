import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchUsersRequest,
  fetchUserByIdRequest,
  createUserRequest,
  updateUserRequest,
  deleteUserRequest,
  toggleUserStatusRequest,
  setSelectedUser,
  setSearch,
  setStatusFilter,
  setSortBy,
  setSortOrder,
  setPage,
  clearError,
  reset,
} from '@/store/slices/userSlice';
import { CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';

// Single Responsibility: This hook only handles user actions
export const useUserActions = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector((state) => state.user);

  // Fetch users with current filters
  const fetchUsers = useCallback((params?: any) => {
    dispatch(fetchUsersRequest(params));
  }, [dispatch]);

  // Fetch user by ID
  const fetchUserById = useCallback((id: string) => {
    dispatch(fetchUserByIdRequest(id));
  }, [dispatch]);

  // Create user
  const createUser = useCallback((userData: CreateUserData) => {
    dispatch(createUserRequest(userData));
  }, [dispatch]);

  // Update user
  const updateUser = useCallback((id: string, userData: UpdateUserData) => {
    dispatch(updateUserRequest({ id, data: userData }));
  }, [dispatch]);

  // Delete user
  const deleteUser = useCallback((id: string) => {
    dispatch(deleteUserRequest(id));
  }, [dispatch]);

  // Toggle user status
  const toggleUserStatus = useCallback((id: string, statusData: ToggleUserStatusData) => {
    dispatch(toggleUserStatusRequest({ id, data: statusData }));
  }, [dispatch]);

  // UI actions
  const setSelectedUserAction = useCallback((user: any) => {
    dispatch(setSelectedUser(user));
  }, [dispatch]);

  const setSearchAction = useCallback((search: string) => {
    dispatch(setSearch(search));
  }, [dispatch]);

  const setStatusFilterAction = useCallback((status: 'all' | 'active' | 'inactive') => {
    dispatch(setStatusFilter(status));
  }, [dispatch]);

  const setSortByAction = useCallback((sortBy: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt') => {
    dispatch(setSortBy(sortBy));
  }, [dispatch]);

  const setSortOrderAction = useCallback((sortOrder: 'asc' | 'desc') => {
    dispatch(setSortOrder(sortOrder));
  }, [dispatch]);

  const setPageAction = useCallback((page: number) => {
    dispatch(setPage(page));
  }, [dispatch]);

  const clearErrorAction = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const resetAction = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return {
    // State
    ...userState,
    
    // Actions
    fetchUsers,
    fetchUserById,
    createUser,
    updateUser,
    deleteUser,
    toggleUserStatus,
    setSelectedUser: setSelectedUserAction,
    setSearch: setSearchAction,
    setStatusFilter: setStatusFilterAction,
    setSortBy: setSortByAction,
    setSortOrder: setSortOrderAction,
    setPage: setPageAction,
    clearError: clearErrorAction,
    reset: resetAction,
  };
}; 