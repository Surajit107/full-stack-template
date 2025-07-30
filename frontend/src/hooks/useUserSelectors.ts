import { useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { createSelector } from '@reduxjs/toolkit';

// Memoized selectors for better performance
const selectUserState = (state: any) => state.user;

// Select all user state
export const useUserState = () => useAppSelector(selectUserState);

// Select users array
export const useUsers = () => useAppSelector((state) => state.user.users);

// Select selected user
export const useSelectedUser = () => useAppSelector((state) => state.user.selectedUser);

// Select loading state
export const useUserLoading = () => useAppSelector((state) => state.user.loading);

// Select error state
export const useUserError = () => useAppSelector((state) => state.user.error);

// Select pagination state
export const useUserPagination = () => useAppSelector((state) => ({
  total: state.user.total,
  page: state.user.page,
  limit: state.user.limit,
  totalPages: state.user.totalPages,
  hasNextPage: state.user.hasNextPage,
  hasPrevPage: state.user.hasPrevPage,
}));

// Select filter state
export const useUserFilters = () => useAppSelector((state) => ({
  search: state.user.search,
  statusFilter: state.user.statusFilter,
  sortBy: state.user.sortBy,
  sortOrder: state.user.sortOrder,
}));

// Memoized selector for filtered and sorted users
const selectFilteredUsers = createSelector(
  [(state: any) => state.user.users, (state: any) => state.user.search],
  (users, search) => {
    if (!search) return users;
    const searchLower = search.toLowerCase();
    return users.filter((user: any) =>
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower)
    );
  }
);

export const useFilteredUsers = () => useAppSelector(selectFilteredUsers);

// Select user by ID
export const useUserById = (id: string) => {
  return useAppSelector((state) => 
    state.user.users.find((user: any) => user._id === id)
  );
};

// Select active users count
export const useActiveUsersCount = () => {
  return useAppSelector((state) => 
    state.user.users.filter((user: any) => user.isActive).length
  );
};

// Select inactive users count
export const useInactiveUsersCount = () => {
  return useAppSelector((state) => 
    state.user.users.filter((user: any) => !user.isActive).length
  );
};

// Select users statistics
export const useUserStats = () => {
  return useAppSelector((state) => {
    const users = state.user.users;
    const total = users.length;
    const active = users.filter((user: any) => user.isActive).length;
    const inactive = total - active;
    
    return {
      total,
      active,
      inactive,
      activePercentage: total > 0 ? Math.round((active / total) * 100) : 0,
      inactivePercentage: total > 0 ? Math.round((inactive / total) * 100) : 0,
    };
  });
}; 