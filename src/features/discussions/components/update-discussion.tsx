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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/lib/auth';
import { canUpdateDiscussion } from '@/lib/authorization';

import { useDiscussion } from '../api/get-discussion';
import {
  UpdateDiscussionInput,
  updateDiscussionInputSchema,
  useUpdateDiscussion,
} from '../api/update-discussion';

type UpdateDiscussionProps = {
  discussionId: string;
};

export const UpdateDiscussion = ({ discussionId }: UpdateDiscussionProps) => {
  const discussionQuery = useDiscussion({ discussionId });
  const updateDiscussionMutation = useUpdateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Discussion Updated');
      },
    },
  });

  const user = useUser();
  const discussion = discussionQuery.data?.data;

  const form = useForm<UpdateDiscussionInput>({
    resolver: zodResolver(updateDiscussionInputSchema),

    defaultValues: {
      title: discussion?.title ?? '',
      body: discussion?.body ?? '',
      public: discussion?.public ?? false,
    },
  });

  function onSubmit(values: UpdateDiscussionInput) {
    updateDiscussionMutation.mutate({ data: values, discussionId });
  }

  if (!canUpdateDiscussion(user?.data)) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className="size-4" />}>
          Update Discussion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Discussion</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <div className="flex items-center space-x-2">
              <Switch
                name="public"
                onCheckedChange={(value) => form.setValue('public', value)}
                checked={form.watch('public')}
                className={` relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2`}
                id="public"
              />
              <Label>Public</Label>
            </div>
            <Button
              isLoading={updateDiscussionMutation.isPending}
              type="submit"
              size="sm"
              disabled={updateDiscussionMutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
