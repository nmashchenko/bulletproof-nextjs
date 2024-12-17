'use client';

import { Spinner } from '@/components/ui/spinner';
import { columns } from '@/features/users/components/users-table/columns';
import { DataTable } from '@/features/users/components/users-table/data-table';

import { useUsers } from '../api/get-users';

export const UsersList = () => {
  const usersQuery = useUsers();

  if (usersQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const users = usersQuery.data?.data;

  if (!users) return null;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={users} />
    </div>
  );
};
