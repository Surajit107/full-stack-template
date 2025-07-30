export interface User {
  _id: string;
  name: string;
  email: string;
  age?: number;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  age?: number;
  bio?: string;
  isActive?: boolean;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  age?: number;
  bio?: string;
  isActive?: boolean;
}

export interface ToggleUserStatusData {
  isActive: boolean;
}

export interface UserFilters {
  search?: string;
  sortBy?: 'name' | 'email' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}