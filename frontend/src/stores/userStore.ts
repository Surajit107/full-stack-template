import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import { graphQLUserService as userService, GetUsersParams, GetUsersResponse } from '@/services/graphql/userService';

interface UserState {
  // State
  users: User[];
  selectedUser: User | null;
  loading: boolean;
  error: string | null;
  
  // Pagination state
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  
  // Search and filter state
  search: string;
  statusFilter: 'all' | 'active' | 'inactive';
  sortBy: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt';
  sortOrder: 'asc' | 'desc';
  
  // Actions
  fetchUsers: (params?: GetUsersParams) => Promise<void>;
  fetchUserById: (id: string) => Promise<void>;
  createUser: (userData: CreateUserData) => Promise<void>;
  updateUser: (id: string, userData: UpdateUserData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  toggleUserStatus: (id: string, statusData: ToggleUserStatusData) => Promise<void>;
  setSelectedUser: (user: User | null) => void;
  setSearch: (search: string) => void;
  setStatusFilter: (status: 'all' | 'active' | 'inactive') => void;
  setSortBy: (sortBy: string) => void;
  setSortOrder: (sortOrder: 'asc' | 'desc') => void;
  setPage: (page: number) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  total: 0,
  page: 1,
  limit: 20,
  totalPages: 0,
  hasNextPage: false,
  hasPrevPage: false,
  search: '',
  statusFilter: 'all' as const,
  sortBy: 'createdAt' as const,
  sortOrder: 'desc' as const,
};

export const useUserStore = create<UserState>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchUsers: async (params: GetUsersParams = {}) => {
        set({ loading: true, error: null });
        try {
          const result = await userService.getUsers(params);
          set({ 
            users: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            loading: false 
          });
        } catch (error) {
          set({ 
            users: [],
            error: error instanceof Error ? error.message : 'Failed to fetch users',
            loading: false 
          });
        }
      },

      fetchUserById: async (id: string) => {
        set({ loading: true, error: null });
        try {
          const user = await userService.getUserById(id);
          set({ selectedUser: user, loading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch user',
            loading: false 
          });
        }
      },

      createUser: async (userData: CreateUserData) => {
        set({ loading: true, error: null });
        try {
          const newUser = await userService.createUser(userData);
          // Refetch users to get updated list
          const result = await userService.getUsers({
            search: get().search,
            status: get().statusFilter,
            sortBy: get().sortBy,
            sortOrder: get().sortOrder,
            page: get().page,
            limit: get().limit,
          });
          set({ 
            users: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            loading: false 
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create user',
            loading: false 
          });
        }
      },

      updateUser: async (id: string, userData: UpdateUserData) => {
        set({ loading: true, error: null });
        try {
          const updatedUser = await userService.updateUser(id, userData);
          // Refetch users to get updated list
          const result = await userService.getUsers({
            search: get().search,
            status: get().statusFilter,
            sortBy: get().sortBy,
            sortOrder: get().sortOrder,
            page: get().page,
            limit: get().limit,
          });
          set(state => ({
            users: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            selectedUser: state.selectedUser?._id === id ? updatedUser : state.selectedUser,
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update user',
            loading: false 
          });
        }
      },

      deleteUser: async (id: string) => {
        set({ loading: true, error: null });
        try {
          await userService.deleteUser(id);
          // Refetch users to get updated list
          const result = await userService.getUsers({
            search: get().search,
            status: get().statusFilter,
            sortBy: get().sortBy,
            sortOrder: get().sortOrder,
            page: get().page,
            limit: get().limit,
          });
          set(state => ({
            users: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            selectedUser: state.selectedUser?._id === id ? null : state.selectedUser,
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete user',
            loading: false 
          });
        }
      },

      toggleUserStatus: async (id: string, statusData: ToggleUserStatusData) => {
        set({ loading: true, error: null });
        try {
          const updatedUser = await userService.toggleUserStatus(id, statusData);
          // Refetch users to get updated list
          const result = await userService.getUsers({
            search: get().search,
            status: get().statusFilter,
            sortBy: get().sortBy,
            sortOrder: get().sortOrder,
            page: get().page,
            limit: get().limit,
          });
          set(state => ({
            users: result.users,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            selectedUser: state.selectedUser?._id === id ? updatedUser : state.selectedUser,
            loading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update user status',
            loading: false 
          });
        }
      },

      setSelectedUser: (user: User | null) => {
        set({ selectedUser: user });
      },

      setSearch: (search: string) => {
        set({ search });
      },

      setStatusFilter: (statusFilter: 'all' | 'active' | 'inactive') => {
        set({ statusFilter });
      },

      setSortBy: (sortBy: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt') => {
        set({ sortBy });
      },

      setSortOrder: (sortOrder: 'asc' | 'desc') => {
        set({ sortOrder });
      },

      setPage: (page: number) => {
        set({ page });
      },

      clearError: () => {
        set({ error: null });
      },

      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'user-store',
    }
  )
);