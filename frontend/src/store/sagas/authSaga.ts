import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { authService } from '@/services/graphql/authService';
import { LoginData } from '@/types/auth';
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logoutStart,
    logoutSuccess,
    logoutFailure,
    refreshTokenStart,
    refreshTokenSuccess,
    refreshTokenFailure,
    setLoading,
} from '../slices/authSlice';

// Selectors
const selectAuth = (state: any) => state.auth;

// Helper function to save tokens to localStorage
function saveTokensToStorage(accessToken: string, refreshToken?: string, user?: any) {
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

// Login saga
function* loginSaga(action: PayloadAction<LoginData>): Generator<any, void, any> {
    try {
        yield put(loginStart());

        const response = yield call(authService.login, action.payload);

        // Save tokens to localStorage
        saveTokensToStorage(response.accessToken, response.refreshToken, response.user);

        yield put(loginSuccess({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        }));
    } catch (error: any) {
        yield put(loginFailure(error.message || 'Login failed'));
    }
}

// Logout saga
function* logoutSaga(): Generator<any, void, any> {
    try {
        yield put(logoutStart());

        const auth = yield select(selectAuth);

        // Only call logout API if user is authenticated
        if (auth.isAuthenticated) {
            yield call(authService.logout);
        }

        // Clear tokens from localStorage
        clearTokensFromStorage();

        yield put(logoutSuccess());
    } catch (error: any) {
        console.error('Logout error:', error);
        // Even if logout API fails, clear local state
        clearTokensFromStorage();
        yield put(logoutSuccess());
    }
}

// Refresh token saga
function* refreshTokenSaga(action: PayloadAction<string>): Generator<any, void, any> {
    try {
        yield put(refreshTokenStart());

        const response = yield call(authService.refreshToken, action.payload);

        // Update tokens in localStorage
        saveTokensToStorage(response.accessToken, response.refreshToken, response.user);

        yield put(refreshTokenSuccess({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
        }));
    } catch (error: any) {
        yield put(refreshTokenFailure(error.message || 'Token refresh failed'));
        // If refresh fails, logout
        yield put(logoutStart());
        clearTokensFromStorage();
        yield put(logoutSuccess());
    }
}

// Initialize auth saga
function* initializeAuthSaga(): Generator<any, void, any> {
    try {
        yield put(setLoading(true));

        if (typeof window !== 'undefined') {
            const accessToken = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');
            const userData = localStorage.getItem('user');

            if (accessToken && userData) {
                const user = JSON.parse(userData);
                yield put({
                    type: 'auth/initializeAuth',
                    payload: {
                        user,
                        accessToken,
                        refreshToken: refreshToken || undefined,
                    },
                });
            }
        }
    } catch (error) {
        console.error('Auth initialization error:', error);
        clearTokensFromStorage();
    } finally {
        yield put(setLoading(false));
    }
}

// Auth saga watcher
export function* authSaga() {
    yield takeLatest('auth/loginRequest', loginSaga);
    yield takeLatest('auth/logoutRequest', logoutSaga);
    yield takeLatest('auth/refreshTokenRequest', refreshTokenSaga);
    yield takeLatest('auth/initializeAuthRequest', initializeAuthSaga);
} 