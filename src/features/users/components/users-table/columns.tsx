import { ColumnDef } from '@tanstack/react-table';

import { DeleteUser } from '@/features/users/components/delete-user';
import { User } from '@/types/api';
import { formatDate } from '@/utils/format';

export const columns: ColumnDef<User>[] = [
  {
    header: 'First Name',
    accessorKey: 'firstName',
  },
  {
    header: 'Last Name',
    accessorKey: 'lastName',
  },
  {
    header: 'Email',
    accessorKey: 'email',
  },
  {
    header: 'Role',
    accessorKey: 'role',
  },
  {
    header: 'Created At',
    accessorKey: 'createdAt',
    cell: ({ row }) => {
      return <span>{formatDate(row.original.createdAt)}</span>;
    },
  },
  {
    header: '',
    accessorKey: 'id',
    cell: ({ row }) => {
      return <DeleteUser id={row.original.id} />;
    },
  },
];
