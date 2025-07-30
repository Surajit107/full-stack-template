# Common Folder Guide - NestJS & GraphQL

## 🎯 What is the Common Folder?

The `common` folder contains **reusable code** that can be used across your entire application. Think of it as a toolbox with shared tools that different parts of your app can use.

## 📁 Folder Structure Overview

```
backend/src/common/
├── abstract/          # Base classes for inheritance
├── constants/         # Shared constants and configurations
├── decorators/        # Custom decorators for metadata
├── exceptions/        # Custom error handling
├── filters/          # Exception filters
├── guards/           # Authentication & authorization guards
├── interceptors/     # Request/response interceptors
├── interfaces/       # TypeScript interfaces
└── utils/           # Helper functions and utilities
```

## 🔍 Detailed Explanation of Each Folder

### 1. **abstract/** - Base Classes
**Purpose**: Contains base classes that other classes can inherit from.

**What it does**: 
- Provides common functionality that multiple classes need
- Reduces code duplication
- Ensures consistency across your app

**Example**: If you have multiple services that all need to do database operations, you can create a base service class here.

### 2. **constants/** - Shared Constants
**Purpose**: Stores values that don't change and are used throughout your app.

**What it does**:
- Defines configuration values
- Stores magic strings/numbers
- Makes your code more maintainable

**Example**: 
```typescript
// constants/index.ts
export const JWT_SECRET = 'your-secret-key';
export const DEFAULT_PAGE_SIZE = 10;
```

### 3. **decorators/** - Custom Decorators ⭐
**Purpose**: Creates custom metadata for your classes and methods.

**What it does**:
- Adds special behavior to your code
- Marks routes as public/private
- Defines user roles
- Extracts user information

**Key Decorators**:
- `@Public()` - Marks a route as public (no login required)
- `@Roles('admin')` - Specifies which roles can access a route
- `@CurrentUser()` - Gets the logged-in user from the request

### 4. **exceptions/** - Custom Errors
**Purpose**: Defines custom error types for your application.

**What it does**:
- Creates specific error messages
- Handles different types of errors consistently
- Makes debugging easier

### 5. **filters/** - Exception Filters
**Purpose**: Catches and handles errors globally.

**What it does**:
- Catches errors from anywhere in your app
- Formats error responses consistently
- Logs errors for debugging

### 6. **guards/** - Authentication & Authorization ⭐
**Purpose**: Protects your routes and controls who can access what.

**What it does**:
- Checks if users are logged in
- Verifies user permissions
- Controls access to different parts of your app

**Key Guards**:
- `AuthGuard` - Checks if user has a valid JWT token
- `RolesGuard` - Checks if user has the right role
- `GlobalAuthGuard` - Applies authentication to all routes by default

### 7. **interceptors/** - Request/Response Processing
**Purpose**: Processes requests and responses before/after they reach your code.

**What it does**:
- Logs requests and responses
- Transforms data
- Adds timing information
- Handles common processing tasks

### 8. **interfaces/** - TypeScript Interfaces ⭐
**Purpose**: Defines the shape of data objects.

**What it does**:
- Ensures data consistency
- Provides better code completion
- Catches errors at compile time

**Key Interfaces**:
- `IUser` - Defines what a user object looks like
- `IAuthResponse` - Defines what login/register responses look like

### 9. **utils/** - Helper Functions
**Purpose**: Contains reusable helper functions.

**What it does**:
- Provides common utility functions
- Reduces code duplication
- Makes code more readable

## 🎯 How These Work Together

### Authentication Flow Example:

1. **User tries to access a protected route**
2. **GlobalAuthGuard** checks if route is public
3. If not public, **AuthGuard** validates JWT token
4. **RolesGuard** checks if user has required role
5. If all pass, user can access the route

### Code Example:

```typescript
// This route requires authentication and admin role
@Query(() => [User])
@UseGuards(AuthGuard, RolesGuard)  // ← Guards check permissions
@Roles('admin')                     // ← Decorator specifies required role
async getUsers(): Promise<User[]> {
  return this.userService.findAll();
}

// This route is public (no login needed)
@Mutation(() => AuthResponse)
@Public()                          // ← Decorator marks as public
async login(@Args('input') input: LoginInput): Promise<AuthResponse> {
  return this.authService.login(input);
}
```

## 🔧 Key Files to Understand

### 1. **decorators/public.decorator.ts**
```typescript
// Marks routes as public (no authentication needed)
@Public()
async login() { ... }
```

### 2. **decorators/roles.decorator.ts**
```typescript
// Specifies which roles can access a route
@Roles('admin', 'manager')
async deleteUser() { ... }
```

### 3. **guards/auth.guard.ts**
```typescript
// Checks JWT token and validates user
// Used on individual routes
```

### 4. **guards/global-auth.guard.ts**
```typescript
// Applies authentication to ALL routes by default
// Routes marked with @Public() bypass this
```

### 5. **interfaces/user.interface.ts**
```typescript
// Defines what a user object looks like
export interface IUser {
  _id: string;
  email: string;
  role: string;
  // ... other properties
}
```

## 🚀 Quick Start Guide

### For New Routes:

1. **Public Route** (no login needed):
   ```typescript
   @Public()
   async publicMethod() { ... }
   ```

2. **Protected Route** (login required):
   ```typescript
   async protectedMethod() { ... }
   ```

3. **Role-Protected Route** (specific role needed):
   ```typescript
   @UseGuards(RolesGuard)
   @Roles('admin')
   async adminOnlyMethod() { ... }
   ```

4. **Get Current User**:
   ```typescript
   async method(@CurrentUser() user: IUser) {
     console.log(user.email); // Access user data
   }
   ```

## 💡 Tips for Beginners

1. **Start with decorators** - They're the easiest to understand
2. **Learn guards next** - They control access to your routes
3. **Use interfaces** - They help you understand data structure
4. **Don't worry about interceptors/filters initially** - They're advanced features

## 🔍 Common Questions

**Q: What's the difference between AuthGuard and GlobalAuthGuard?**
- `AuthGuard`: Applied to individual routes
- `GlobalAuthGuard`: Applied to ALL routes automatically

**Q: When do I use @Public()?**
- Use it for routes that don't need login (login, register, public data)

**Q: What's the difference between @Roles() and RolesGuard?**
- `@Roles()`: Specifies which roles are allowed
- `RolesGuard`: Actually checks if the user has those roles

This structure helps keep your code organized, reusable, and maintainable! 