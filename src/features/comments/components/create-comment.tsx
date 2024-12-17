'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';

import {
  useCreateComment,
  createCommentInputSchema,
  CreateCommentInput,
} from '../api/create-comment';

type CreateCommentProps = {
  discussionId: string;
};

export const CreateComment = ({ discussionId }: CreateCommentProps) => {
  const createCommentMutation = useCreateComment({
    discussionId,
    mutationConfig: {
      onSuccess: () => {
        toast.success('Comment Created');
      },
    },
  });

  const form = useForm<CreateCommentInput>({
    resolver: zodResolver(createCommentInputSchema),
    defaultValues: {
      body: '',
      discussionId: discussionId,
    },
  });

  function onSubmit(values: CreateCommentInput) {
    createCommentMutation.mutate({ data: values });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create Comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Comment</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Body</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={createCommentMutation.isPending}
              type="submit"
              size="sm"
              disabled={createCommentMutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
