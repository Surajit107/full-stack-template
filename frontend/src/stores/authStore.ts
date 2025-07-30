import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { authService } from '@/services/graphql/authService';
import { LoginData, AuthUser } from '@/types/auth';

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  // Actions
  login: (loginData: LoginData) => Promise<void>;
  logout: () => Promise<void>;
  refreshTokenAction: (token: string) => Promise<void>;
  clearError: () => void;
  initializeAuth: () => void;
}

type AuthStore = AuthState & AuthActions;

// Helper function to save tokens to localStorage
function saveTokensToStorage(accessToken: string, refreshToken?: string, user?: AuthUser) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', accessToken);
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }
}

// Helper function to clear tokens from localStorage
function clearTokensFromStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }
}

// Helper function to navigate to auth page
function navigateToAuth() {
  if (typeof window !== 'undefined') {
    window.location.href = '/auth';
  }
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (loginData: LoginData) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authService.login(loginData);
          
          // Save tokens to localStorage
          saveTokensToStorage(response.accessToken, response.refreshToken, response.user);
          
          set({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken || null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Login failed',
          });
          throw error;
        }
      },

      logout: async () => {
        try {
          set({ isLoading: true });
          
          const { isAuthenticated } = get();
          
          // Only call logout API if user is authenticated
          if (isAuthenticated) {
            await authService.logout();
          }
          
          // Clear tokens from localStorage
          clearTokensFromStorage();
          
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });

          // Navigate to auth page after successful logout
          navigateToAuth();
        } catch (error: any) {
          console.error('Logout error:', error);
          // Even if logout API fails, clear local state
          clearTokensFromStorage();
          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
          
          // Navigate to auth page even if API call fails
          navigateToAuth();
        }
      },

      refreshTokenAction: async (token: string) => {
        try {
          set({ isLoading: true, error: null });
          
          const response = await authService.refreshToken(token);
          
          // Update tokens in localStorage
          saveTokensToStorage(response.accessToken, response.refreshToken, response.user);
          
          set({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken || null,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error: any) {
          set({
            isLoading: false,
            error: error.message || 'Token refresh failed',
          });
          // If refresh fails, logout
          await get().logout();
          throw error;
        }
      },

      clearError: () => {
        set({ error: null });
      },

      initializeAuth: () => {
        try {
          set({ isLoading: true });
          
          if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userData = localStorage.getItem('user');
            
            if (accessToken && userData) {
              const user = JSON.parse(userData);
              set({
                user,
                accessToken,
                refreshToken: refreshToken || null,
                isAuthenticated: true,
                isLoading: false,
                error: null,
              });
            } else {
              set({ isLoading: false });
            }
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          clearTokensFromStorage();
          set({ isLoading: false });
        }
      },
    }),
    {
      name: 'auth-store',
    }
  )
); 