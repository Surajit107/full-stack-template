import { call, put, takeLatest, select } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { GetUsersParams, GetUsersResponse } from '@/services/graphql/userService';
import { UserRepository } from '@/repositories/UserRepository';
import { User, CreateUserData, UpdateUserData, ToggleUserStatusData } from '@/types/user';
import { graphQLUserService } from '@/services/graphql/userService';
import {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersFailure,
  fetchUserByIdRequest,
  fetchUserByIdSuccess,
  fetchUserByIdFailure,
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  updateUserRequest,
  updateUserSuccess,
  updateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  toggleUserStatusRequest,
  toggleUserStatusSuccess,
  toggleUserStatusFailure,
} from '../slices/userSlice';
import { RootState } from '../index';

const userRepository = new UserRepository(graphQLUserService);

// Fetch users saga
function* fetchUsersSaga(action: PayloadAction<GetUsersParams>) {
  try {
    const state: RootState = yield select();
    const params = {
      search: state.user.search,
      status: state.user.statusFilter,
      sortBy: state.user.sortBy,
      sortOrder: state.user.sortOrder,
      page: state.user.page,
      limit: state.user.limit,
      ...action.payload,
    };
    const response: GetUsersResponse = yield call(userRepository.findAll, params);
    yield put(fetchUsersSuccess(response));
  } catch (error: any) {
    const errorMessage: string = error?.response?.data?.message || error?.message || 'Failed to fetch users';
    yield put(fetchUsersFailure(errorMessage));
  }
}

// Fetch user by ID saga
function* fetchUserByIdSaga(action: PayloadAction<string>) {
  try {
    const user: User = yield call(userRepository.findById, action.payload);
    yield put(fetchUserByIdSuccess(user));
  } catch (error: any) {
    const errorMessage: string = error?.response?.data?.message || error?.message || 'Failed to fetch user';
    yield put(fetchUserByIdFailure(errorMessage));
  }
}

// Create user saga
function* createUserSaga(action: PayloadAction<CreateUserData>) {
  try {
    const user: User = yield call(userRepository.create, action.payload);
    yield put(createUserSuccess(user));
  } catch (error: any) {
    const errorMessage: string = error?.response?.data?.message || error?.message || 'Failed to create user';
    yield put(createUserFailure(errorMessage));
  }
}

// Update user saga
function* updateUserSaga(action: PayloadAction<{ id: string; data: UpdateUserData }>) {
  try {
    const { id, data } = action.payload;
    const user: User = yield call(userRepository.update, id, data);
    yield put(updateUserSuccess(user));
  } catch (error: any) {
    const errorMessage = error?.response?.data?.message || error?.message || 'Failed to update user';
    yield put(updateUserFailure(errorMessage));
  }
}

// Delete user saga
function* deleteUserSaga(action: PayloadAction<string>) {
  try {
    yield call(userRepository.delete, action.payload);
    yield put(deleteUserSuccess(action.payload));
  } catch (error: any) {
    const errorMessage: string = error?.response?.data?.message || error?.message || 'Failed to delete user';
    yield put(deleteUserFailure(errorMessage));
  }
}

// Toggle user status saga
function* toggleUserStatusSaga(action: PayloadAction<{ id: string; data: ToggleUserStatusData }>) {
  try {
    const { id, data } = action.payload;
    const user: User = yield call(userRepository.toggleStatus, id, data);
    yield put(toggleUserStatusSuccess(user));
  } catch (error: any) {
    const errorMessage: string = error?.response?.data?.message || error?.message || 'Failed to toggle user status';
    yield put(toggleUserStatusFailure(errorMessage));
  }
}

// Main user saga watcher
export function* userSaga() {
  yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
  yield takeLatest(fetchUserByIdRequest.type, fetchUserByIdSaga);
  yield takeLatest(createUserRequest.type, createUserSaga);
  yield takeLatest(updateUserRequest.type, updateUserSaga);
  yield takeLatest(deleteUserRequest.type, deleteUserSaga);
  yield takeLatest(toggleUserStatusRequest.type, toggleUserStatusSaga);
} 