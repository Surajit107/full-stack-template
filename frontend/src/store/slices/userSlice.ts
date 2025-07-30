import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';

// Single Responsibility: This interface only handles user state
export interface UserState {
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
}

// Open/Closed Principle: Easy to extend with new actions
export interface UserActions {
  // Fetch actions
  fetchUsersRequest: (payload?: any) => void;
  fetchUsersSuccess: (payload: any) => void;
  fetchUsersFailure: (payload: string) => void;
  
  fetchUserByIdRequest: (payload: string) => void;
  fetchUserByIdSuccess: (payload: User) => void;
  fetchUserByIdFailure: (payload: string) => void;
  
  // CRUD actions
  createUserRequest: (payload: CreateUserData) => void;
  createUserSuccess: (payload: User) => void;
  createUserFailure: (payload: string) => void;
  
  updateUserRequest: (payload: { id: string; data: UpdateUserData }) => void;
  updateUserSuccess: (payload: User) => void;
  updateUserFailure: (payload: string) => void;
  
  deleteUserRequest: (payload: string) => void;
  deleteUserSuccess: (payload: string) => void;
  deleteUserFailure: (payload: string) => void;
  
  toggleUserStatusRequest: (payload: { id: string; data: ToggleUserStatusData }) => void;
  toggleUserStatusSuccess: (payload: User) => void;
  toggleUserStatusFailure: (payload: string) => void;
  
  // UI actions
  setSelectedUser: (payload: User | null) => void;
  setSearch: (payload: string) => void;
  setStatusFilter: (payload: 'all' | 'active' | 'inactive') => void;
  setSortBy: (payload: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt') => void;
  setSortOrder: (payload: 'asc' | 'desc') => void;
  setPage: (payload: number) => void;
  clearError: () => void;
  reset: () => void;
}

const initialState: UserState = {
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
  statusFilter: 'all',
  sortBy: 'createdAt',
  sortOrder: 'desc',
};

// Interface Segregation: Each reducer handles a specific concern
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Loading states
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    
    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    
    // Fetch users
    fetchUsersRequest: (state, action: PayloadAction<any>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.users = action.payload.users;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.totalPages = action.payload.totalPages;
      state.hasNextPage = action.payload.hasNextPage;
      state.hasPrevPage = action.payload.hasPrevPage;
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.users = [];
    },
    
    // Fetch user by ID
    fetchUserByIdRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserByIdSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.selectedUser = action.payload;
    },
    fetchUserByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Create user
    createUserRequest: (state, action: PayloadAction<CreateUserData>) => {
      state.loading = true;
      state.error = null;
    },
    createUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users = [action.payload, ...state.users];
      state.total += 1;
    },
    createUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Update user
    updateUserRequest: (state, action: PayloadAction<{ id: string; data: UpdateUserData }>) => {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users = state.users.map(user => 
        user._id === action.payload._id ? action.payload : user
      );
      if (state.selectedUser?._id === action.payload._id) {
        state.selectedUser = action.payload;
      }
    },
    updateUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Delete user
    deleteUserRequest: (state, action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    deleteUserSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.users = state.users.filter(user => user._id !== action.payload);
      if (state.selectedUser?._id === action.payload) {
        state.selectedUser = null;
      }
      state.total -= 1;
    },
    deleteUserFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Toggle user status
    toggleUserStatusRequest: (state, action: PayloadAction<{ id: string; data: ToggleUserStatusData }>) => {
      state.loading = true;
      state.error = null;
    },
    toggleUserStatusSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.users = state.users.map(user => 
        user._id === action.payload._id ? action.payload : user
      );
      if (state.selectedUser?._id === action.payload._id) {
        state.selectedUser = action.payload;
      }
    },
    toggleUserStatusFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // UI actions
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<'all' | 'active' | 'inactive'>) => {
      state.statusFilter = action.payload;
    },
    setSortBy: (state, action: PayloadAction<'name' | 'email' | 'age' | 'createdAt' | 'updatedAt'>) => {
      state.sortBy = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc'>) => {
      state.sortOrder = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    reset: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setLoading,
  setError,
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdRequest,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  toggleUserStatusRequest,
  toggleUserStatusSuccess,
  toggleUserStatusFailure,
  setSelectedUser,
  setSearch,
  setStatusFilter,
  setSortBy,
  setSortOrder,
  setPage,
  clearError,
  reset,
} = userSlice.actions;

export const userReducer = userSlice.reducer; 