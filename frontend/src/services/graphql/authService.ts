import { ApolloClient, FetchResult } from '@apollo/client';
import { apolloClient } from '@/lib/apollo-client';
import {
  LOGIN_MUTATION,
  LOGOUT_MUTATION,
  REFRESH_TOKEN_MUTATION
} from '@/graphql/mutations';
import {
  LoginData,
  AuthResponse,
  LogoutResponse,
} from '@/types/auth';

// GraphQL Auth Service
export class GraphQLAuthService {
  constructor(private client: ApolloClient<any>) { }

  // Login user
  async login(loginData: LoginData): Promise<AuthResponse> {
    try {
      const result: FetchResult<{ login: AuthResponse }> = await this.client.mutate({
        mutation: LOGIN_MUTATION,
        variables: { loginDto: loginData },
      });

      if (!result.data?.login) {
        throw new Error('Login failed');
      }

      return result.data.login;
    } catch (error: any) {
      console.error('GraphQL login error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Logout user
  async logout(): Promise<LogoutResponse> {
    try {
      const result: FetchResult<{ logout: LogoutResponse }> = await this.client.mutate({
        mutation: LOGOUT_MUTATION,
      });

      if (!result.data?.logout) {
        throw new Error('Logout failed');
      }

      return result.data.logout;
    } catch (error: any) {
      console.error('GraphQL logout error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Refresh token
  async refreshToken(token: string): Promise<AuthResponse> {
    try {
      const result: FetchResult<{ refreshToken: AuthResponse }> = await this.client.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: { input: { token } },
      });

      if (!result.data?.refreshToken) {
        throw new Error('Token refresh failed');
      }

      return result.data.refreshToken;
    } catch (error: any) {
      console.error('GraphQL refreshToken error:', error);
      throw this.handleGraphQLError(error);
    }
  }

  // Health check
  async healthCheck(): Promise<{ status: string; timestamp: string }> {
    try {
      // Simple health check - you can implement a specific health check query if needed
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error('Health check error:', error);
      throw new Error('Health check failed');
    }
  }

  // Error handler
  private handleGraphQLError(error: any): Error {
    if (error.graphQLErrors && error.graphQLErrors.length > 0) {
      const graphQLError = error.graphQLErrors[0];
      return new Error(graphQLError.message || 'GraphQL error occurred');
    }

    if (error.networkError) {
      return new Error('Network error occurred');
    }

    return new Error(error.message || 'An unexpected error occurred');
  }
}

// Export singleton instance
export const authService = new GraphQLAuthService(apolloClient); 