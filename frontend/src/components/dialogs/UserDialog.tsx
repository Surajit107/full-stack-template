import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserForm } from '@/components/forms/UserForm';
import { User } from '@/types/user';
import { CreateUserFormData, UpdateUserFormData } from '@/lib/validations/user';

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User;
  onSubmit: (data: CreateUserFormData | UpdateUserFormData) => Promise<void>;
  isLoading?: boolean;
}

export function UserDialog({ 
  open, 
  onOpenChange, 
  user, 
  onSubmit, 
  isLoading = false 
}: UserDialogProps) {
  const isEditing = !!user;
  const title = isEditing ? 'Edit User' : 'Create New User';

  const handleCancel = () => {
    onOpenChange(false);
  };

  const handleSubmit = async (data: CreateUserFormData | UpdateUserFormData) => {
    await onSubmit(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg lg:text-xl">{title}</DialogTitle>
        </DialogHeader>
        <UserForm
          user={user}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
}