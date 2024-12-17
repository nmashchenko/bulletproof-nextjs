'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { paths } from '@/config/paths';
import { useLogin, loginInputSchema, LoginInput } from '@/lib/auth';

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin({
    onSuccess,
  });

  const searchParams = useSearchParams();
  const redirectTo = searchParams?.get('redirectTo');

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginInputSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginInput) {
    login.mutate(values);
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button isLoading={login.isPending} type="submit" className="w-full">
            Log in
          </Button>
        </form>
      </Form>
      <div className="mt-2 flex items-center justify-end">
        <div className="text-sm">
          <NextLink
            href={paths.auth.register.getHref(redirectTo)}
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Register
          </NextLink>
        </div>
      </div>
    </div>
  );
};
