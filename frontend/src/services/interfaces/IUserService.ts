import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import { GetUsersParams, GetUsersResponse } from '@/services/graphql/userService';

// Dependency Inversion Principle: High-level modules should not depend on low-level modules
export interface IUserService {
  // Fetch operations
  getUsers(params?: GetUsersParams): Promise<GetUsersResponse>;
  getUserById(id: string): Promise<User>;
  
  // CRUD operations
  createUser(userData: CreateUserData): Promise<User>;
  updateUser(id: string, userData: UpdateUserData): Promise<User>;
  deleteUser(id: string): Promise<User>;
  
  // Status operations
  toggleUserStatus(id: string, statusData: ToggleUserStatusData): Promise<User>;
  
  // Health check
  healthCheck(): Promise<{ status: string; timestamp: string }>;
} 