import { IUserService } from '@/services/interfaces/IUserService';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import { GetUsersParams, GetUsersResponse } from '@/services/graphql/userService';
import { graphQLUserService } from '@/services/graphql/userService';

// Repository Pattern: Abstracts data access logic
export class UserRepository {
  constructor(private userService: IUserService) {}

  // Single Responsibility: Each method has one clear purpose
  async findAll(params?: GetUsersParams): Promise<GetUsersResponse> {
    return this.userService.getUsers(params);
  }

  async findById(id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  async create(userData: CreateUserData): Promise<User> {
    return this.userService.createUser(userData);
  }

  async update(id: string, userData: UpdateUserData): Promise<User> {
    return this.userService.updateUser(id, userData);
  }

  async delete(id: string): Promise<User> {
    return this.userService.deleteUser(id);
  }

  async toggleStatus(id: string, statusData: ToggleUserStatusData): Promise<User> {
    return this.userService.toggleUserStatus(id, statusData);
  }

  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    return this.userService.healthCheck();
  }
} 