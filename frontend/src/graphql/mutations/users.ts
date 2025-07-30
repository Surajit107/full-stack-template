import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

// Mutation to create a new user
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserDto!) {
    createUser(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation to update an existing user
export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserDto!) {
    updateUser(id: $id, input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation to delete a user
export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

// Mutation to toggle user status
export const TOGGLE_USER_STATUS = gql`
  mutation ToggleUserStatus($id: ID!, $isActive: Boolean!) {
    toggleUserStatus(id: $id, isActive: $isActive) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

// Note: Bulk operations are not available in the current backend schema
// These mutations are commented out until backend supports them
/*
export const BULK_UPDATE_USERS = gql`
  mutation BulkUpdateUsers($ids: [ID!]!, $input: UpdateUserDto!) {
    bulkUpdateUsers(ids: $ids, input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

export const BULK_DELETE_USERS = gql`
  mutation BulkDeleteUsers($ids: [ID!]!) {
    bulkDeleteUsers(ids: $ids) {
      _id
    }
  }
`;

export const BULK_TOGGLE_USER_STATUS = gql`
  mutation BulkToggleUserStatus($ids: [ID!]!, $isActive: Boolean!) {
    bulkToggleUserStatus(ids: $ids, isActive: $isActive) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;
*/ 