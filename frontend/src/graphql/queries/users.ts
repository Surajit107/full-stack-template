import { gql } from '@apollo/client';
import { USER_FRAGMENT } from '../fragments';

// Query to get users with pagination, filtering, and sorting
export const GET_USERS = gql`
  query GetUsers($input: UserQueryDto!) {
    usersWithPagination(input: $input) {
      data {
        ...UserFragment
      }
      meta {
        total
        page
        limit
        totalPages
        hasNextPage
        hasPrevPage
      }
    }
  }
  ${USER_FRAGMENT}
`;

// Query to get a single user by ID
export const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`;

// Query to get users count for statistics
export const GET_USERS_COUNT = gql`
  query GetUsersCount {
    userCount
  }
`;

// Query to check if user exists by email
export const CHECK_USER_EMAIL = gql`
  query CheckUserEmail($email: String!) {
    users(input: { search: $email }) {
      _id
      email
    }
  }
`; 