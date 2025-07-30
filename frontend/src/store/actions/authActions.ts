import { createAction } from '@reduxjs/toolkit';
import { LoginData } from '@/types/auth';

// Auth actions
export const loginRequest = createAction<LoginData>('auth/loginRequest');
export const logoutRequest = createAction('auth/logoutRequest');
export const refreshTokenRequest = createAction<string>('auth/refreshTokenRequest');
export const initializeAuthRequest = createAction('auth/initializeAuthRequest'); 