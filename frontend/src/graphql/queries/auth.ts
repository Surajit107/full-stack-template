import { gql } from '@apollo/client';

// Login query (if needed for checking auth status)
export const LOGIN = gql`
  query Login($loginDto: LoginInput!) {
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

// Logout query (if needed for checking auth status)
export const LOGOUT = gql`
  query Logout {
    logout {
      message
    }
  }
`;

// Refresh token query (if needed for checking auth status)
export const REFRESH_TOKEN = gql`
  query RefreshToken($input: RefreshTokenInput!) {
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