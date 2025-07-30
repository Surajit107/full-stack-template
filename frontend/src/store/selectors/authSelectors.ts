import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@/store/index';

// Base selectors
const selectAuthState = (state: RootState) => state.auth;

// Derived selectors
export const selectUser = createSelector(
  [selectAuthState],
  (auth) => auth.user
);

export const selectAccessToken = createSelector(
  [selectAuthState],
  (auth) => auth.accessToken
);

export const selectRefreshToken = createSelector(
  [selectAuthState],
  (auth) => auth.refreshToken
);

export const selectIsAuthenticated = createSelector(
  [selectAuthState],
  (auth) => auth.isAuthenticated
);

export const selectIsLoading = createSelector(
  [selectAuthState],
  (auth) => auth.isLoading
);

export const selectError = createSelector(
  [selectAuthState],
  (auth) => auth.error
);

export const selectUserRole = createSelector(
  [selectUser],
  (user) => user?.role
);

export const selectIsAdmin = createSelector(
  [selectUserRole],
  (role) => role === 'admin'
);

export const selectIsUser = createSelector(
  [selectUserRole],
  (role) => role === 'user'
); 