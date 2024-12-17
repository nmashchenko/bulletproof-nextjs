import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef, Row } from '@tanstack/react-table';

import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { getDiscussionQueryOptions } from '@/features/discussions/api/get-discussion';
import { DeleteDiscussion } from '@/features/discussions/components/delete-discussion';
import { Discussion } from '@/types/api';
import { formatDate } from '@/utils/format';

export const columns = (
  onDiscussionPrefetch?: (id: string) => void,
): ColumnDef<Discussion>[] => {
  return [
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Created At',
      accessorKey: 'createdAt',
      cell: ({ row }) => {
        return <span>{formatDate(row.original.createdAt)}</span>;
      },
    },
    {
      id: 'viewDiscussion',
      cell: ({ row }) => {
        return (
          <ViewDiscussionCell
            row={row}
            onDiscussionPrefetch={onDiscussionPrefetch}
          />
        );
      },
    },
    {
      id: 'deleteDiscussion',
      cell: ({ row }) => {
        return <DeleteDiscussion id={row.original.id} />;
      },
    },
  ];
};

const ViewDiscussionCell = ({
  row,
  onDiscussionPrefetch,
}: {
  row: Row<Discussion>;
  onDiscussionPrefetch?: (id: string) => void;
}) => {
  const queryClient = useQueryClient();

  return (
    <Link
      onMouseEnter={() => {
        // Prefetch the discussion data when the user hovers over the link
        queryClient.prefetchQuery(getDiscussionQueryOptions(row.original.id));
        onDiscussionPrefetch?.(row.original.id);
      }}
      href={paths.app.discussion.getHref(row.original.id)}
    >
      View
    </Link>
  );
};
