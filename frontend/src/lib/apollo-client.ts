import { ApolloClient, InMemoryCache, createHttpLink, from, ApolloLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// HTTP Link - Main GraphQL endpoint
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:3001/graphql',
  credentials: 'include', // Include credentials for CSRF protection
  fetchOptions: {
    mode: 'cors',
  },
});

// Auth Link - Add authentication headers
const authLink = setContext((_, { headers }) => {
  // Get token from localStorage if available
  const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    }
  };
});

// Operation Name Link - Add operation name for CSRF protection
const operationNameLink = new ApolloLink((operation, forward) => {
  // Extract operation name from the query
  const operationName = operation.operationName || 'GraphQL';
  
  // Add operation name to headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      'x-apollo-operation-name': operationName,
      'apollo-require-preflight': 'true', // Force preflight for CSRF protection
    }
  }));
  
  return forward(operation);
});

// Error Link - Handle GraphQL and network errors
const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      );
      
      // Handle specific GraphQL errors
      if (extensions?.code === 'UNAUTHENTICATED') {
              // Handle authentication errors
      console.error('Authentication error - redirecting to login');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/auth';
      }
      }
    });
  }

  if (networkError) {
    console.error(`[Network error]: ${networkError}`);
    
    // Handle CORS errors
    if (networkError.message.includes('CORS') || networkError.message.includes('Access-Control')) {
      console.error('CORS error detected. Please check backend CORS configuration.');
      console.error('Backend should allow origin: http://localhost:3000');
    }
    
    // Handle connection errors more gracefully
    if (networkError.name === 'NetworkError' || networkError.message.includes('ECONNRESET')) {
      console.error('Connection failed - please ensure the backend server is running on http://localhost:3001');
      
      // Show user-friendly error message
      if (typeof window !== 'undefined') {
        // You can show a toast notification here
        console.warn('Backend server is not running. Please start the backend server with: cd backend && npm run start:dev');
      }
    }
    
    // Handle specific network errors
    if ('statusCode' in networkError && networkError.statusCode === 401) {
      console.error('Unauthorized - redirecting to login');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/auth';
      }
    }
  }
});

// Create Apollo Client with all links
export const apolloClient = new ApolloClient({
  link: from([
    errorLink,
    operationNameLink,
    authLink,
    httpLink
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          users: {
            // Merge function for paginated users
            keyArgs: false,
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  }),
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
}); 