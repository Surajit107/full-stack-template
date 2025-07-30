import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';
import { Calendar, Mail, User as UserIcon, FileText, Hash, Power, PowerOff } from 'lucide-react';

interface UserDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User | null;
}

export function UserDetailsDialog({ open, onOpenChange, user }: UserDetailsDialogProps) {
  if (!user) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 text-lg lg:text-xl">
            <UserIcon className="h-5 w-5" />
            <span>User Details</span>
          </DialogTitle>
          <DialogDescription className="text-sm">
            View detailed information about {user.name}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 lg:space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <UserIcon className="h-4 w-4" />
                <span>Basic Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="text-xs lg:text-sm font-medium text-muted-foreground">Name</label>
                  <p className="text-sm lg:text-base font-medium">{user.name}</p>
                </div>
                <div>
                  <label className="text-xs lg:text-sm font-medium text-muted-foreground">Email</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm lg:text-base font-medium break-all">{user.email}</p>
                  </div>
                </div>
                {user.age && (
                  <div>
                    <label className="text-xs lg:text-sm font-medium text-muted-foreground">Age</label>
                    <p className="text-sm lg:text-base font-medium">{user.age} years old</p>
                  </div>
                )}
                <div>
                  <label className="text-xs lg:text-sm font-medium text-muted-foreground">Status</label>
                  <div className="flex items-center space-x-2">
                    {user.isActive ? (
                      <Power className="h-4 w-4 text-green-600" />
                    ) : (
                      <PowerOff className="h-4 w-4 text-gray-500" />
                    )}
                    <Badge variant={user.isActive ? "default" : "secondary"}>
                      {user.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs lg:text-sm font-medium text-muted-foreground">User ID</label>
                  <div className="flex items-center space-x-2">
                    <Hash className="h-4 w-4 text-muted-foreground" />
                    <p className="text-xs lg:text-sm font-mono bg-muted px-2 py-1 rounded break-all">
                      {user._id}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bio Section */}
          {user.bio && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                  <FileText className="h-4 w-4" />
                  <span>Bio</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm lg:text-base text-muted-foreground">{user.bio}</p>
              </CardContent>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Calendar className="h-4 w-4" />
                <span>Timestamps</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 lg:space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
                <div>
                  <label className="text-xs lg:text-sm font-medium text-muted-foreground">Created</label>
                  <p className="text-sm lg:text-base font-medium">{formatDate(user.createdAt)}</p>
                </div>
                {user.updatedAt && (
                  <div>
                    <label className="text-xs lg:text-sm font-medium text-muted-foreground">Last Updated</label>
                    <p className="text-sm lg:text-base font-medium">{formatDate(user.updatedAt)}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}