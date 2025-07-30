# GraphQL Implementation with Apollo Client

This document describes the GraphQL implementation using Apollo Client, including link configuration, error handling, and integration with Redux Saga.

## 🏗️ Architecture Overview

### Apollo Client Configuration
- **HTTP Link**: Main GraphQL endpoint connection
- **Auth Link**: Automatic authentication header injection
- **Error Link**: Comprehensive error handling and logging
- **Link Chain**: Proper link separation and ordering

### GraphQL Operations
- **Queries**: User fetching with pagination, filtering, sorting
- **Mutations**: CRUD operations for users
- **Fragments**: Reusable user data fragments
- **Bulk Operations**: Batch operations for multiple users

## 📁 File Structure

```
frontend/src/
├── lib/
│   └── apollo-client.ts          # Apollo Client configuration
├── graphql/
│   ├── queries/
│   │   └── users.ts              # GraphQL queries
│   └── mutations/
│       └── users.ts              # GraphQL mutations
├── services/
│   └── graphql/
│       └── userService.ts        # GraphQL service implementation
└── components/
    └── providers/
        └── apollo-provider.tsx   # Apollo Provider wrapper
```

## 🔧 Apollo Client Setup

### Link Configuration

#### 1. HTTP Link
```typescript
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql',
});
```

#### 2. Auth Link
```typescript
const authLink = setContext((_, { headers }) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    }
  };
});
```

#### 3. Error Link
```typescript
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      console.error(`[GraphQL error]: ${message}`);
      
      if (extensions?.code === 'UNAUTHENTICATED') {
        // Handle authentication errors
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
  }
});
```

#### 4. Link Chain
```typescript
export const apolloClient = new ApolloClient({
  link: from([
    errorLink,    // Handle errors first
    authLink,     // Add auth headers
    httpLink      // Make HTTP requests
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
});
```

## 📊 GraphQL Queries

### User Queries

#### Get Users with Pagination
```graphql
query GetUsers(
  $search: String
  $status: String
  $sortBy: String
  $sortOrder: String
  $page: Int
  $limit: Int
) {
  users(
    search: $search
    status: $status
    sortBy: $sortBy
    sortOrder: $sortOrder
    page: $page
    limit: $limit
  ) {
    users {
      _id
      name
      email
      age
      bio
      isActive
      createdAt
      updatedAt
    }
    total
    page
    limit
    totalPages
    hasNextPage
    hasPrevPage
  }
}
```

#### Get User by ID
```graphql
query GetUserById($id: ID!) {
  user(id: $id) {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
}
```

#### Get Users Count
```graphql
query GetUsersCount($status: String) {
  usersCount(status: $status)
}
```

## 🔄 GraphQL Mutations

### User Mutations

#### Create User
```graphql
mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
}
```

#### Update User
```graphql
mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
  updateUser(id: $id, input: $input) {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
}
```

#### Delete User
```graphql
mutation DeleteUser($id: ID!) {
  deleteUser(id: $id) {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
}
```

#### Toggle User Status
```graphql
mutation ToggleUserStatus($id: ID!, $isActive: Boolean!) {
  toggleUserStatus(id: $id, isActive: $isActive) {
    _id
    name
    email
    age
    bio
    isActive
    createdAt
    updatedAt
  }
}
```

## 🏭 GraphQL Service Implementation

### Service Class
```typescript
export class GraphQLUserService {
  constructor(private client: ApolloClient<any>) {}

  async getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    try {
      const result = await this.client.query({
        query: GET_USERS,
        variables: params,
        fetchPolicy: 'network-only',
      });

      return result.data.users;
    } catch (error: any) {
      throw this.handleGraphQLError(error);
    }
  }

  // ... other methods
}
```

### Error Handling
```typescript
private handleGraphQLError(error: any): Error {
  if (error.graphQLErrors && error.graphQLErrors.length > 0) {
    const graphQLError = error.graphQLErrors[0];
    return new Error(graphQLError.message || 'GraphQL error occurred');
  }

  if (error.networkError) {
    return new Error(error.networkError.message || 'Network error occurred');
  }

  return new Error(error.message || 'An unexpected error occurred');
}
```

## 🔗 Integration with Redux Saga

### Saga Implementation
```typescript
export function* userSaga() {
  const userRepository = new UserRepository(graphQLUserService);
  const sagaHandler = createUserSagaHandler(userRepository);

  yield takeLatest(fetchUsersRequest.type, sagaHandler.fetchUsers.bind(sagaHandler));
  yield takeLatest(createUserRequest.type, sagaHandler.createUser.bind(sagaHandler));
  // ... other sagas
}
```

### Repository Pattern
```typescript
export class UserRepository {
  constructor(private userService: IUserService) {}

  async findAll(params?: GetUsersParams): Promise<GetUsersResponse> {
    return this.userService.getUsers(params);
  }

  // ... other methods
}
```

## 🎯 Key Features

### 1. **Link Separation**
- **Error Link**: Handles GraphQL and network errors
- **Auth Link**: Automatically adds authentication headers
- **HTTP Link**: Makes actual GraphQL requests

### 2. **Error Handling**
- Comprehensive error logging
- Authentication error handling
- Network error handling
- User-friendly error messages

### 3. **Caching Strategy**
- **Cache-first**: For read operations
- **Network-only**: For fresh data
- **Cache-and-network**: For real-time updates

### 4. **Query Refetching**
- Automatic refetch after mutations
- Optimistic updates
- Cache invalidation

### 5. **Type Safety**
- Full TypeScript support
- GraphQL type generation
- Runtime type checking

## 🚀 Usage Examples

### Using GraphQL Service Directly
```typescript
import { graphQLUserService } from '@/services/graphql/userService';

// Get users
const users = await graphQLUserService.getUsers({
  search: 'john',
  status: 'active',
  page: 1,
  limit: 20
});

// Create user
const newUser = await graphQLUserService.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});
```

### Using with Redux Saga
```typescript
// The saga automatically uses GraphQL service through repository
const { fetchUsers, createUser } = useUserActions();

// Fetch users
fetchUsers({ search: 'john', status: 'active' });

// Create user
createUser({ name: 'John Doe', email: 'john@example.com' });
```

## 🔧 Configuration

### Environment Variables
```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
NEXT_PUBLIC_ENV=development
```

### Apollo Client Options
```typescript
defaultOptions: {
  watchQuery: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network'
  },
  query: {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  },
  mutate: {
    errorPolicy: 'all'
  }
}
```

## 🧪 Testing

### Mock Apollo Client
```typescript
import { MockedProvider } from '@apollo/client/testing';

const mocks = [
  {
    request: {
      query: GET_USERS,
      variables: { page: 1, limit: 20 }
    },
    result: {
      data: {
        users: {
          users: [],
          total: 0,
          page: 1,
          limit: 20,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false
        }
      }
    }
  }
];

<MockedProvider mocks={mocks} addTypename={false}>
  <YourComponent />
</MockedProvider>
```

## 📈 Performance Optimizations

### 1. **Query Optimization**
- Use fragments for reusable data
- Implement field-level caching
- Optimize query complexity

### 2. **Cache Management**
- Configure type policies
- Implement cache normalization
- Use cache field policies

### 3. **Network Optimization**
- Implement query batching
- Use persisted queries
- Optimize payload size

## 🔒 Security

### 1. **Authentication**
- Automatic token injection
- Token refresh handling
- Secure token storage

### 2. **Authorization**
- Role-based access control
- Field-level permissions
- Operation-level security

### 3. **Error Handling**
- Sanitized error messages
- Secure error logging
- Rate limiting handling

## 🚨 Troubleshooting

### Common Issues

#### 1. **Network Errors**
- Check GraphQL endpoint URL
- Verify network connectivity
- Check CORS configuration

#### 2. **Authentication Errors**
- Verify token format
- Check token expiration
- Validate token storage

#### 3. **Cache Issues**
- Clear Apollo cache
- Check cache policies
- Verify cache normalization

#### 4. **Type Errors**
- Regenerate GraphQL types
- Check TypeScript configuration
- Verify schema compatibility

## 📚 Best Practices

### 1. **Query Design**
- Use fragments for reusable data
- Implement proper pagination
- Optimize query complexity

### 2. **Error Handling**
- Implement comprehensive error handling
- Provide user-friendly error messages
- Log errors for debugging

### 3. **Performance**
- Use appropriate fetch policies
- Implement proper caching
- Optimize bundle size

### 4. **Security**
- Validate all inputs
- Implement proper authentication
- Use HTTPS in production

## 🔄 Migration from REST

### Benefits of GraphQL
1. **Reduced Over-fetching**: Get only needed data
2. **Single Endpoint**: One endpoint for all operations
3. **Strong Typing**: Type-safe operations
4. **Real-time Updates**: Subscriptions support
5. **Better Developer Experience**: GraphQL Playground

### Migration Strategy
1. **Parallel Implementation**: Run REST and GraphQL side by side
2. **Gradual Migration**: Migrate one feature at a time
3. **Feature Flags**: Use flags to switch between implementations
4. **Monitoring**: Track performance and error rates

This GraphQL implementation provides a robust, scalable, and maintainable solution for data fetching and state management, following best practices and SOLID principles. 