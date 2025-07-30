import { gql } from '@apollo/client';

// GraphQL Fragment for User
// This fragment defines the common fields used across user queries and mutations
export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
`; 