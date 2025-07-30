# Common Components Flow Diagram

## 🔄 Request Flow Through Common Components

```
User Request
    ↓
┌─────────────────────────────────────┐
│         GlobalAuthGuard             │ ← Checks if route is public
│  (Applied to ALL routes by default) │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│           AuthGuard                 │ ← Validates JWT token
│     (Applied to specific routes)    │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│           RolesGuard                │ ← Checks user roles
│     (Applied to specific routes)    │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│         Your Route Handler          │ ← Your actual code
│      (Resolver/Controller)          │
└─────────────────────────────────────┘
    ↓
┌─────────────────────────────────────┐
│         Response to User            │
└─────────────────────────────────────┘
```

## 🎯 Decorators in Action

```
Route Definition:
┌─────────────────────────────────────────────────────────┐
│ @Query(() => [User])                                  │
│ @UseGuards(AuthGuard, RolesGuard)                     │ ← Guards
│ @Roles('admin')                                        │ ← Role requirement
│ async getUsers(@CurrentUser() user: IUser): User[] {   │ ← Get user data
│   return this.userService.findAll();                   │
│ }                                                      │
└─────────────────────────────────────────────────────────┘
```

## 🔐 Authentication Scenarios

### Scenario 1: Public Route
```
User Request → @Public() → Route Handler ✅
```

### Scenario 2: Protected Route (No Role Required)
```
User Request → AuthGuard → Route Handler ✅
```

### Scenario 3: Role-Protected Route
```
User Request → AuthGuard → RolesGuard → Route Handler ✅
```

### Scenario 4: Unauthorized Access
```
User Request → AuthGuard → ❌ UnauthorizedException
```

## 📁 File Relationships

```
common/
├── decorators/
│   ├── @Public()           ← Marks routes as public
│   ├── @Roles('admin')     ← Specifies required roles
│   └── @CurrentUser()      ← Gets user from request
│
├── guards/
│   ├── GlobalAuthGuard     ← Applied to ALL routes
│   ├── AuthGuard           ← Validates JWT tokens
│   └── RolesGuard          ← Checks user roles
│
└── interfaces/
    ├── IUser               ← User data structure
    └── IAuthResponse       ← Auth response structure
```

## 🚀 Quick Examples

### 1. Public Login Route
```typescript
@Mutation(() => AuthResponse)
@Public()  // ← No authentication needed
async login(@Args('input') input: LoginInput) {
  return this.authService.login(input);
}
```

### 2. Protected User Route
```typescript
@Query(() => User)
// No @Public() = authentication required
async getProfile(@CurrentUser() user: IUser) {
  return this.userService.findById(user._id);
}
```

### 3. Admin-Only Route
```typescript
@Mutation(() => User)
@UseGuards(RolesGuard)  // ← Check roles
@Roles('admin')          // ← Admin role required
async deleteUser(@Args('id') id: string) {
  return this.userService.delete(id);
}
```

## 💡 Key Points to Remember

1. **@Public()** = No authentication needed
2. **No @Public()** = Authentication required
3. **@Roles()** = Specifies which roles are allowed
4. **@UseGuards()** = Applies guards to the route
5. **@CurrentUser()** = Gets the logged-in user

## 🔍 Debugging Tips

- If you get "Unauthorized", check if you need `@Public()`
- If you get "Forbidden", check if you have the right role
- If you get "User not found", check if `@CurrentUser()` is used correctly 