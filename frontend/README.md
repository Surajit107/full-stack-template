# User Management System - Frontend

A modern, modular user management system built with Next.js, shadcn/ui, and Zustand for state management.

## 🏗️ Architecture Overview

This project follows a modular architecture similar to Redux Toolkit patterns, with clear separation of concerns:

### 📁 Directory Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── users/             # User management pages
│   └── layout.tsx         # Root layout with navigation
├── components/            # Reusable UI components
│   ├── forms/            # Form components
│   ├── tables/           # Table components
│   ├── dialogs/          # Dialog/modal components
│   └── ui/               # shadcn/ui components
├── lib/                  # Utility libraries
│   ├── api.ts           # API configuration
│   └── validations/     # Zod validation schemas
├── services/            # API service layer
├── stores/              # Zustand state management
└── types/               # TypeScript type definitions
```

## 🧩 Modular Components

### 1. **API Layer** (`lib/api.ts`)
- Centralized axios configuration
- Request/response interceptors
- Error handling and logging

### 2. **Service Layer** (`services/userService.ts`)
- Business logic for API calls
- Type-safe service methods
- Clean separation from UI components

### 3. **State Management** (`stores/userStore.ts`)
- Zustand store with Redux-like patterns
- Async actions with loading states
- Error handling and optimistic updates
- DevTools integration

### 4. **Validation Layer** (`lib/validations/user.ts`)
- Zod schemas for form validation
- Type-safe form data
- Consistent validation across components

### 5. **UI Components**
- **Forms** (`components/forms/UserForm.tsx`): Reusable form with validation
- **Tables** (`components/tables/UserTable.tsx`): Data display with actions
- **Dialogs** (`components/dialogs/UserDialog.tsx`): Modal forms for CRUD operations

## 🚀 Key Features

### ✅ Modern Stack
- **Next.js 15** with App Router
- **shadcn/ui** for beautiful components
- **Zustand** for lightweight state management
- **React Hook Form** with Zod validation
- **TypeScript** for type safety

### ✅ Modular Architecture
- **Service Layer**: API calls and business logic
- **Store Layer**: State management with actions
- **Component Layer**: Reusable UI components
- **Validation Layer**: Form validation schemas

### ✅ User Experience
- **Loading States**: Skeleton and spinner components
- **Error Handling**: Toast notifications
- **Optimistic Updates**: Immediate UI feedback
- **Form Validation**: Real-time validation feedback

### ✅ Developer Experience
- **Type Safety**: Full TypeScript coverage
- **DevTools**: Zustand DevTools integration
- **Hot Reload**: Fast development experience
- **Modular**: Easy to extend and maintain

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- Backend API running (see backend README)

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 🎨 Component Usage

### User Form
```tsx
import { UserForm } from '@/components/forms/UserForm';

<UserForm
  user={selectedUser}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  isLoading={loading}
/>
```

### User Table
```tsx
import { UserTable } from '@/components/tables/UserTable';

<UserTable
  users={users}
  onEdit={handleEdit}
  onDelete={handleDelete}
  onViewDetails={handleViewDetails}
  isLoading={loading}
/>
```

### User Dialog
```tsx
import { UserDialog } from '@/components/dialogs/UserDialog';

<UserDialog
  open={dialogOpen}
  onOpenChange={setDialogOpen}
  user={selectedUser}
  onSubmit={handleSubmit}
  isLoading={loading}
/>
```

### User Details Dialog
```tsx
import { UserDetailsDialog } from '@/components/dialogs/UserDetailsDialog';

<UserDetailsDialog
  open={detailsDialogOpen}
  onOpenChange={setDetailsDialogOpen}
  user={userToView}
/>
```

### Confirmation Dialog
```tsx
import { ConfirmationDialog } from '@/components/dialogs/ConfirmationDialog';

<ConfirmationDialog
  open={deleteDialogOpen}
  onOpenChange={setDeleteDialogOpen}
  title="Delete User"
  description="Are you sure you want to delete this user? This action cannot be undone."
  confirmText="Delete User"
  cancelText="Cancel"
  variant="destructive"
  onConfirm={handleDelete}
  isLoading={loading}
/>
```

### Confirmation Dialog Examples

#### Delete Confirmation
```tsx
<ConfirmationDialog
  open={deleteDialogOpen}
  onOpenChange={setDeleteDialogOpen}
  title="Delete Item"
  description="Are you sure you want to delete this item? This action cannot be undone."
  confirmText="Delete"
  variant="destructive"
  onConfirm={handleDelete}
/>
```

#### Archive Confirmation
```tsx
<ConfirmationDialog
  open={archiveDialogOpen}
  onOpenChange={setArchiveDialogOpen}
  title="Archive Item"
  description="This item will be moved to the archive. You can restore it later."
  confirmText="Archive"
  variant="default"
  onConfirm={handleArchive}
/>
```

#### Save Changes Confirmation
```tsx
<ConfirmationDialog
  open={saveDialogOpen}
  onOpenChange={setSaveDialogOpen}
  title="Save Changes"
  description="Do you want to save your changes before leaving?"
  confirmText="Save"
  cancelText="Don't Save"
  variant="default"
  onConfirm={handleSave}
/>
```

## 🔄 State Management

### Store Usage
```tsx
import { useUserStore } from '@/stores/userStore';

const { users, loading, fetchUsers, createUser } = useUserStore();
```

### Available Actions
- `fetchUsers()` - Get all users
- `fetchUserById(id)` - Get single user
- `createUser(data)` - Create new user
- `updateUser(id, data)` - Update user
- `deleteUser(id)` - Delete user
- `setSelectedUser(user)` - Set selected user
- `clearError()` - Clear error state
- `reset()` - Reset store state

## 🎯 Best Practices

### 1. **Modular Design**
- Keep components small and focused
- Separate concerns (API, state, UI)
- Use composition over inheritance

### 2. **Type Safety**
- Define interfaces for all data structures
- Use Zod for runtime validation
- Leverage TypeScript for compile-time checks

### 3. **Error Handling**
- Centralized error handling in stores
- User-friendly error messages
- Graceful degradation

### 4. **Performance**
- Optimistic updates for better UX
- Proper loading states
- Efficient re-renders with Zustand

## 🔮 Future Enhancements

- [ ] Add search and filtering
- [ ] Implement pagination
- [ ] Add user roles and permissions
- [ ] Real-time updates with WebSockets
- [ ] Advanced form validation
- [ ] Unit and integration tests
- [ ] Dark mode support
- [ ] Mobile-responsive design

## 📚 Dependencies

### Core
- `next` - React framework
- `react` - UI library
- `typescript` - Type safety

### UI & Styling
- `shadcn/ui` - Component library
- `tailwindcss` - CSS framework
- `lucide-react` - Icons

### State & Data
- `zustand` - State management
- `axios` - HTTP client
- `react-hook-form` - Form handling
- `zod` - Validation

### Development
- `@types/node` - TypeScript types
- `eslint` - Code linting

## 🤝 Contributing

1. Follow the modular architecture
2. Add proper TypeScript types
3. Include form validation
4. Test your changes
5. Update documentation

## 📄 License

MIT License - see LICENSE file for details
