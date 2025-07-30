import { ApolloClient, ApolloQueryResult, FetchResult } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import { 
  GET_USERS, 
  GET_USER_BY_ID, 
  GET_USERS_COUNT, 
  CHECK_USER_EMAIL 
} from '@/graphql/queries';
import { 
  CREATE_USER, 
  UPDATE_USER, 
  DELETE_USER, 
  TOGGLE_USER_STATUS
} from '@/graphql/mutations';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import {
  GetUserByIdResponse,
  GetUsersCountResponse,
  CheckUserEmailResponse,
  CreateUserResponse,
  UpdateUserResponse,
  DeleteUserResponse,
  ToggleUserStatusResponse,
  UserQueryDto,
  CreateUserDto,
  UpdateUserDto,
  ToggleUserStatusDto,
} from '@/graphql/types';

// Export the same interfaces as the REST service for compatibility
export interface GetUsersParams {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  sortBy?: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Service response interface (transformed from GraphQL response)
export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

// GraphQL User Service implementing the same interface as REST service
export class GraphQLUserService {
  constructor(private client: ApolloClient<any>) {}

  // Get users with pagination, filtering, and sorting
  async getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    try {
      const input: UserQueryDto = {
        search: params.search || undefined,
        status: params.status || undefined,
        sortBy: params.sortBy || undefined,
        sortOrder: params.sortOrder || undefined,
        page: params.page || 1,
        limit: params.limit || 20,
      };

      const result: ApolloQueryResult<{ usersWithPagination: any }> = await this.client.query({
        query: GET_USERS,
        variables: { input },
        fetchPolicy: 'network-only', // Always fetch fresh data
      });

      const response = result.data.usersWithPagination;
      return {
        users: response.data,
        total: response.meta.total,
        page: response.meta.page,
        limit: response.meta.limit,
        totalPages: response.meta.totalPages,
        hasNextPage: response.meta.hasNextPage,
        hasPrevPage: response.meta.hasPrevPage,
      };
    } catch (error: any) {
      console.error('GraphQL getUsers error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    try {
      const result: ApolloQueryResult<GetUserByIdResponse> = await this.client.query({
        query: GET_USER_BY_ID,
        variables: { id },
        fetchPolicy: 'cache-first',
      });

      return result.data.user;
    } catch (error: any) {
      console.error('GraphQL getUserById error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Create new user
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const result: FetchResult<CreateUserResponse> = await this.client.mutate({
        mutation: CREATE_USER,
        variables: { input: userData },
      });

      return result.data!.createUser;
    } catch (error: any) {
      console.error('GraphQL createUser error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Update user
  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      const result: FetchResult<UpdateUserResponse> = await this.client.mutate({
        mutation: UPDATE_USER,
        variables: { id, input: userData },
      });

      return result.data!.updateUser;
    } catch (error: any) {
      console.error('GraphQL updateUser error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const result: FetchResult<DeleteUserResponse> = await this.client.mutate({
        mutation: DELETE_USER,
        variables: { id },
      });

      return result.data!.deleteUser;
    } catch (error: any) {
      console.error('GraphQL deleteUser error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Toggle user status
  async toggleUserStatus(id: string, statusData: ToggleUserStatusData): Promise<User> {
    try {
      const result: FetchResult<ToggleUserStatusResponse> = await this.client.mutate({
        mutation: TOGGLE_USER_STATUS,
        variables: { id, isActive: statusData.isActive },
      });

      return result.data!.toggleUserStatus;
    } catch (error: any) {
      console.error('GraphQL toggleUserStatus error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Get users count
  async getUsersCount(status?: string): Promise<number> {
    try {
      const result: ApolloQueryResult<GetUsersCountResponse> = await this.client.query({
        query: GET_USERS_COUNT,
        fetchPolicy: 'cache-first',
      });

      return result.data.userCount;
    } catch (error: any) {
      console.error('GraphQL getUsersCount error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Check if user email exists
  async checkUserEmail(email: string): Promise<boolean> {
    try {
      const result: ApolloQueryResult<CheckUserEmailResponse> = await this.client.query({
        query: CHECK_USER_EMAIL,
        variables: { email },
        fetchPolicy: 'cache-first',
      });

      // Check if any user with this email exists
      return result.data.users.length > 0;
    } catch (error: any) {
      console.error('GraphQL checkUserEmail error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Note: Bulk operations are not available in the current backend schema
  // These methods are commented out until backend supports them
  /*
  async bulkUpdateUsers(ids: string[], userData: UpdateUserData): Promise<User[]> {
    try {
      const result: FetchResult<any> = await this.client.mutate({
        mutation: BULK_UPDATE_USERS,
        variables: { ids, input: userData },
        refetchQueries: [
          { query: GET_USERS },
          { query: GET_USERS_COUNT }
        ],
      });

      return result.data.bulkUpdateUsers;
    } catch (error: any) {
      console.error('GraphQL bulkUpdateUsers error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  async bulkDeleteUsers(ids: string[]): Promise<{ _id: string }[]> {
    try {
      const result: FetchResult<any> = await this.client.mutate({
        mutation: BULK_DELETE_USERS,
        variables: { ids },
        refetchQueries: [
          { query: GET_USERS },
          { query: GET_USERS_COUNT }
        ],
      });

      return result.data.bulkDeleteUsers;
    } catch (error: any) {
      console.error('GraphQL bulkDeleteUsers error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  async bulkToggleUserStatus(ids: string[], isActive: boolean): Promise<User[]> {
    try {
      const result: FetchResult<any> = await this.client.mutate({
        mutation: BULK_TOGGLE_USER_STATUS,
        variables: { ids, isActive },
        refetchQueries: [
          { query: GET_USERS },
          { query: GET_USERS_COUNT }
        ],
      });

      return result.data.bulkToggleUserStatus;
    } catch (error: any) {
      console.error('GraphQL bulkToggleUserStatus error:', error);
      throw this.handleGraphQLError(error);
    }
  }
  */

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      // Simple query to check if GraphQL server is responding
      await this.client.query({
        query: GET_USERS_COUNT,
        fetchPolicy: 'network-only',
      });

      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('GraphQL healthCheck error:', error);
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Handle GraphQL errors consistently
  private handleGraphQLError(error: any): Error {
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const graphQLError = error.graphQLErrors[0];
      return new Error(graphQLError.message || 'GraphQL error occurred');
    }

    if (error.networkError) {
      return new Error(error.networkError.message || 'Network error occurred');
    }

    return new Error(error.message || 'An unexpected error occurred');
  }
}

// Export singleton instance
export const graphQLUserService = new GraphQLUserService(apolloClient); 