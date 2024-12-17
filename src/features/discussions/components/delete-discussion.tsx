'use client';

import { Trash } from 'lucide-react';
import { toast } from 'sonner';

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
import { Button } from '@/components/ui/button';
import { useUser } from '@/lib/auth';
import { canDeleteDiscussion } from '@/lib/authorization';

import { useDeleteDiscussion } from '../api/delete-discussion';

type DeleteDiscussionProps = {
  id: string;
};

export const DeleteDiscussion = ({ id }: DeleteDiscussionProps) => {
  const user = useUser();
  const deleteDiscussionMutation = useDeleteDiscussion({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Discussion deleted');
      },
    },
  });

  if (!canDeleteDiscussion(user?.data)) {
    return null;
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          icon={<Trash className="size-4" />}
        >
          Delete Discussion
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this discussion?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              isLoading={deleteDiscussionMutation.isPending}
              type="button"
              variant="destructive"
              onClick={() =>
                deleteDiscussionMutation.mutate({ discussionId: id })
              }
            >
              Delete Discussion
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
