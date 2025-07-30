// TypeScript types for GraphQL User operations
// These types correspond to the GraphQL schema and provide type safety

export interface UserFragment {
  _id: string;
  name: string;
  email: string;
  age: number;
  bio?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserQueryDto {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  sortBy?: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page: number;
  limit: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  age: number;
  bio?: string;
  isActive?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  age?: number;
  bio?: string;
  isActive?: boolean;
}

export interface ToggleUserStatusDto {
  isActive: boolean;
}

// Response types for GraphQL operations
export interface GetUsersResponse {
  usersWithPagination: {
    data: UserFragment[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  };
}

export interface GetUserByIdResponse {
  user: UserFragment;
}

export interface GetUsersCountResponse {
  userCount: number;
}

export interface CheckUserEmailResponse {
  users: Array<{
    _id: string;
    email: string;
  }>;
}

export interface CreateUserResponse {
  createUser: UserFragment;
}

export interface UpdateUserResponse {
  updateUser: UserFragment;
}

export interface DeleteUserResponse {
  deleteUser: UserFragment;
}

export interface ToggleUserStatusResponse {
  toggleUserStatus: UserFragment;
} 