'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth';

import { useDeleteUser } from '../api/delete-user';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Trash } from 'lucide-react';
import { toast } from 'sonner';

type DeleteUserProps = {
  id: string;
};

export const DeleteUser = ({ id }: DeleteUserProps) => {
  const user = useUser();
  const deleteUserMutation = useDeleteUser({
    mutationConfig: {
      onSuccess: () => {
        toast.success('User Deleted');
      },
    },
  });

  if (user.data?.id === id) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          icon={<Trash className="size-4" />}
        >
          Delete Comment
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this user?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={deleteUserMutation.isPending}
              type="button"
              variant="destructive"
              onClick={() => deleteUserMutation.mutate({ userId: id })}
            >
              Delete User
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
