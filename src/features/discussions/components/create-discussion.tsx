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
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/lib/auth';
import { canCreateDiscussion } from '@/lib/authorization';

import {
  CreateDiscussionInput,
  createDiscussionInputSchema,
  useCreateDiscussion,
} from '../api/create-discussion';

export const CreateDiscussion = () => {
  const createDiscussionMutation = useCreateDiscussion({
    mutationConfig: {
      onSuccess: () => {
        toast.success('Created Discussion');
      },
    },
  });

  const form = useForm<CreateDiscussionInput>({
    resolver: zodResolver(createDiscussionInputSchema),
    defaultValues: {
      title: '',
      body: '',
      public: false,
    },
  });

  function onSubmit(values: CreateDiscussionInput) {
    createDiscussionMutation.mutate({ data: values });
  }

  const user = useUser();

  if (!canCreateDiscussion(user?.data)) {
    return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" icon={<Plus className="size-4" />}>
          Create Discussion
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Discussion</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
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
              />
              <Label>Public</Label>
            </div>
            <Button
              isLoading={createDiscussionMutation.isPending}
              type="submit"
              size="sm"
              disabled={createDiscussionMutation.isPending}
            >
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
