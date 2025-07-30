import { gql } from '@apollo/client';

// Login mutation
export const LOGIN_MUTATION = gql`
  mutation Login($loginDto: LoginInput!) {
    login(loginDto: $loginDto) {
      user {
        _id
        email
        role
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`;

// Logout mutation
export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout {
      message
    }
  }
`;

// Refresh token mutation
export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshToken(input: $input) {
      user {
        _id
        email
        role
        createdAt
        updatedAt
      }
      accessToken
      refreshToken
    }
  }
`; 