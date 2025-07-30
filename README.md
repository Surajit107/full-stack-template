# Full Stack User Management System

A modern, full-stack user management application built with NestJS GraphQL backend, Next.js frontend, and MongoDB database. Features a beautiful, responsive UI with authentication, real-time data management, and comprehensive logout functionality.

## 🚀 Features

- **Backend**: NestJS GraphQL API with MongoDB integration
- **Frontend**: Modern Next.js 15 with TypeScript, Tailwind CSS, and shadcn/ui
- **Database**: MongoDB with Mongoose ODM
- **GraphQL**: Type-safe API with Apollo Client
- **Authentication**: JWT-based authentication with refresh tokens
- **State Management**: Zustand for efficient state management
- **UI Components**: Beautiful, accessible components with dark mode support
- **User Management**: Complete CRUD operations with search, filtering, and pagination
- **Real-time Updates**: Optimized data fetching and caching
- **Multiple Logout Options**: Sidebar, settings, keyboard shortcuts, and automatic session timeout

## 🏗️ Architecture

```
├── backend/          # NestJS GraphQL API
│   ├── src/
│   │   ├── main.ts              # Application entry point
│   │   ├── app.module.ts        # Main application module
│   │   ├── modules/
│   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.resolver.ts
│   │   │   │   └── auth.repository.ts
│   │   │   └── user/            # User management module
│   │   │       ├── user.service.ts
│   │   │       ├── user.resolver.ts
│   │   │       └── user.repository.ts
│   │   ├── common/              # Shared utilities
│   │   │   ├── guards/          # Authentication guards
│   │   │   ├── decorators/      # Custom decorators
│   │   │   └── interfaces/      # TypeScript interfaces
│   │   ├── graphql/             # GraphQL types and schemas
│   │   └── infrastructure/      # Database and config
│   ├── schema.gql               # GraphQL schema
│   └── package.json
├── frontend/         # Next.js 15 application
│   ├── src/
│   │   ├── app/                 # App Router pages
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── auth/            # Authentication pages
│   │   │   ├── users/           # User management
│   │   │   ├── analytics/       # Analytics page
│   │   │   ├── reports/         # Reports page
│   │   │   └── settings/        # Settings page
│   │   ├── components/          # Reusable UI components
│   │   │   ├── auth/            # Authentication components
│   │   │   ├── layout/          # Layout components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   └── dialogs/         # Modal dialogs
│   │   ├── stores/              # Zustand state management
│   │   ├── services/            # API services
│   │   ├── graphql/             # GraphQL operations
│   │   ├── hooks/               # Custom React hooks
│   │   └── lib/                 # Utilities and configurations
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Backend
- **NestJS**: Progressive Node.js framework
- **GraphQL**: Type-safe API with Apollo Server
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication and authorization
- **class-validator**: Input validation
- **bcryptjs**: Password hashing

### Frontend
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type safety throughout
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Beautiful, accessible components
- **Apollo Client**: GraphQL client
- **Zustand**: Lightweight state management
- **Lucide React**: Icon library

## 🔐 Authentication Features

### Login/Register
- Email and password authentication
- JWT access tokens with refresh tokens
- Secure password hashing with bcrypt
- Input validation with class-validator

### Logout Options
- **User Dropdown Menu**: Top-right corner logout
- **Sidebar Logout Button**: Quick access in sidebar
- **Settings Page**: Account settings with logout
- **Keyboard Shortcut**: Ctrl/Cmd + Shift + L
- **Automatic Session Timeout**: 30-minute inactivity logout

### Security
- Protected routes with authentication guards
- Token-based session management
- Automatic token refresh
- Secure logout with server-side token invalidation

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)
- Git

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

#### Backend (.env file in backend directory)
```bash
# Copy the example file
cp env.sample .env

# Edit .env with your configuration
MONGODB_URI=mongodb://localhost:27017/user-management
PORT=3001
NODE_ENV=development
CORS_ORIGINS=http://localhost:3000
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key
```

#### Frontend (.env.local file in frontend directory)
```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your GraphQL URL
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/graphql
```

### 3. Start MongoDB

```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGODB_URI in backend/.env
```

### 4. Run Development Servers

```bash
# Terminal 1: Start backend
cd backend
npm run start:dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the application!

## 📚 GraphQL API

### Authentication
- `login(loginDto: LoginInput!)` - User login
- `register(registerDto: RegisterInput!)` - User registration
- `logout` - User logout
- `refreshToken(input: RefreshTokenInput!)` - Refresh access token

### User Management
- `usersWithPagination(input: UserQueryDto!)` - Get paginated users with filters
- `userCount` - Get total user count
- `userById(id: ID!)` - Get user by ID
- `users(input: UserQueryDto!)` - Search users
- `createUser(input: CreateUserDto!)` - Create new user
- `updateUser(id: ID!, input: UpdateUserDto!)` - Update user
- `deleteUser(id: ID!)` - Delete user
- `toggleUserStatus(id: ID!, input: ToggleUserStatusDto!)` - Toggle user status

### Example User Object
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user",
  "age": 30,
  "bio": "Software Developer",
  "isActive": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

## 🎨 UI Features

- **Responsive Design**: Works on all device sizes
- **Dark Mode**: Toggle between light and dark themes
- **Loading States**: Beautiful loading skeletons and spinners
- **Search & Filter**: Advanced user search and filtering
- **Pagination**: Efficient data pagination
- **Real-time Updates**: Instant UI updates after operations
- **Accessibility**: WCAG compliant components
- **Multiple Logout Options**: Convenient logout from various locations

## 🔧 Development Scripts

### Backend
```bash
npm run start:dev      # Start development server
npm run build          # Build for production
npm run test           # Run tests
npm run lint           # Lint code
npm run seed:admin     # Seed admin user
```

### Frontend
```bash
npm run dev            # Start development server
npm run build          # Build for production
npm run start          # Start production server
npm run lint           # Lint code
```

## 🌐 Environment Variables

### Backend
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)
- `CORS_ORIGINS`: Allowed frontend origins
- `JWT_SECRET`: JWT signing secret
- `JWT_REFRESH_SECRET`: JWT refresh token secret

### Frontend
- `NEXT_PUBLIC_GRAPHQL_URL`: GraphQL API URL

## 📦 Project Structure

```
full_stack_template/
├── backend/
│   ├── src/
│   │   ├── main.ts              # Application entry point
│   │   ├── app.module.ts        # Main module
│   │   ├── modules/
│   │   │   ├── auth/            # Authentication module
│   │   │   │   ├── auth.service.ts
│   │   │   │   ├── auth.resolver.ts
│   │   │   │   ├── auth.repository.ts
│   │   │   │   └── dto/         # Data transfer objects
│   │   │   └── user/            # User management module
│   │   │       ├── user.service.ts
│   │   │       ├── user.resolver.ts
│   │   │       ├── user.repository.ts
│   │   │       └── entities/    # Database entities
│   │   ├── common/              # Shared utilities
│   │   │   ├── guards/          # Authentication guards
│   │   │   ├── decorators/      # Custom decorators
│   │   │   ├── interfaces/      # TypeScript interfaces
│   │   │   └── utils/           # Utility functions
│   │   ├── graphql/             # GraphQL types
│   │   │   └── types/           # GraphQL type definitions
│   │   └── infrastructure/      # Database and config
│   │       ├── config/          # Configuration files
│   │       └── database/        # Database setup
│   ├── schema.gql               # GraphQL schema
│   ├── package.json
│   └── env.sample
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── page.tsx         # Dashboard
│   │   │   ├── auth/            # Authentication pages
│   │   │   ├── users/           # User management
│   │   │   ├── analytics/       # Analytics
│   │   │   ├── reports/         # Reports
│   │   │   └── settings/        # Settings
│   │   ├── components/          # UI components
│   │   │   ├── auth/            # Authentication components
│   │   │   ├── layout/          # Layout components
│   │   │   ├── ui/              # shadcn/ui components
│   │   │   ├── tables/          # Data tables
│   │   │   └── dialogs/         # Modal dialogs
│   │   ├── stores/              # Zustand stores
│   │   ├── services/            # API services
│   │   ├── graphql/             # GraphQL operations
│   │   │   ├── queries/         # GraphQL queries
│   │   │   ├── mutations/       # GraphQL mutations
│   │   │   ├── fragments/       # GraphQL fragments
│   │   │   └── types/           # TypeScript types
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── useKeyboardShortcuts.ts
│   │   │   └── useSessionTimeout.ts
│   │   └── lib/                 # Utilities
│   ├── package.json
│   └── env.example
└── README.md
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt password encryption
- **Input Validation**: Comprehensive data validation with class-validator
- **CORS Configuration**: Proper cross-origin resource sharing
- **Protected Routes**: Authentication guards for sensitive endpoints
- **Session Management**: Secure token refresh and logout
- **Type Safety**: Full TypeScript coverage
- **GraphQL Security**: Built-in GraphQL security features

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests (if configured)
cd frontend
npm run test
```

## 🚀 Performance Optimizations

- **GraphQL**: Efficient data fetching with precise queries
- **Apollo Client**: Intelligent caching and state management
- **Zustand**: Lightweight, fast state management
- **Next.js 15**: Latest performance optimizations
- **Code Splitting**: Automatic code splitting for better performance
- **Optimized Bundles**: Efficient JavaScript bundles
- **Session Timeout**: Automatic logout for security

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, please open an issue in the repository or contact the development team.

## 🎯 Roadmap

- [x] Authentication & Authorization
- [x] Multiple Logout Options
- [x] Session Timeout
- [x] Keyboard Shortcuts
- [ ] Role-based Access Control
- [ ] File Upload Support
- [ ] Email Notifications
- [ ] Advanced Analytics
- [ ] Mobile App
- [ ] Docker Deployment
- [ ] CI/CD Pipeline