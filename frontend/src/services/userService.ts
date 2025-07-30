import { api } from '@/lib/api';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import { IUserService } from './interfaces/IUserService';

// Retry configuration for Lambda cold starts
const RETRY_CONFIG = {
  maxRetries: 2,
  retryDelay: 1000, // 1 second
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries = RETRY_CONFIG.maxRetries
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error: any) {
    if (retries > 0 && (error.code === 'ECONNABORTED' || error.response?.status >= 500)) {
      console.log(`Retrying request, ${retries} attempts remaining...`);
      await delay(RETRY_CONFIG.retryDelay);
      return retryRequest(requestFn, retries - 1);
    }
    throw error;
  }
};

// Helper function to extract data from nested response
const extractData = (response: any) => {
  return response.data?.data || response.data;
};

export interface GetUsersParams {
  search?: string;
  status?: 'all' | 'active' | 'inactive';
  sortBy?: 'name' | 'email' | 'age' | 'createdAt' | 'updatedAt';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface GetUsersResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export const userService: IUserService = {
  // Get users with search, filtering, sorting, and pagination
  async getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    try {
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.status) queryParams.append('status', params.status);
      if (params.sortBy) queryParams.append('sortBy', params.sortBy);
      if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
      if (params.page) queryParams.append('page', params.page.toString());
      if (params.limit) queryParams.append('limit', params.limit.toString());

      const response = await retryRequest(() => 
        api.get<any>(`/users?${queryParams.toString()}`)
      );
      
      return extractData(response);
    } catch (error) {
      console.error('getUsers error:', error);
      throw error;
    }
  },

  // Get user by ID
  async getUserById(id: string): Promise<User> {
    try {
      const response = await retryRequest(() => api.get<any>(`/users/${id}`));
      return extractData(response);
    } catch (error) {
      console.error('getUserById error:', error);
      throw error;
    }
  },

  // Create new user
  async createUser(userData: CreateUserData): Promise<User> {
    try {
      const response = await retryRequest(() => api.post<any>('/users', userData));
      return extractData(response);
    } catch (error) {
      console.error('createUser error:', error);
      throw error;
    }
  },

  // Update user
  async updateUser(id: string, userData: UpdateUserData): Promise<User> {
    try {
      const response = await retryRequest(() => api.patch<any>(`/users/${id}`, userData));
      return extractData(response);
    } catch (error) {
      console.error('updateUser error:', error);
      throw error;
    }
  },

  // Delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const response = await retryRequest(() => api.delete<any>(`/users/${id}`));
      return extractData(response);
    } catch (error) {
      console.error('deleteUser error:', error);
      throw error;
    }
  },

  // Toggle user status
  async toggleUserStatus(id: string, statusData: ToggleUserStatusData): Promise<User> {
    try {
      const response = await retryRequest(() => api.patch<any>(`/users/${id}/toggle-status`, statusData));
      return extractData(response);
    } catch (error) {
      console.error('toggleUserStatus error:', error);
      throw error;
    }
  },

  // Health check for Lambda status
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      const response = await api.get<{ status: string; timestamp: string }>('/health');
      return response.data;
    } catch (error) {
      console.error('Health check error:', error);
      throw error;
    }
  },
};