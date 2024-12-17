'use client';

import { useSearchParams } from 'next/navigation';

import { Spinner } from '@/components/ui/spinner';
import { columns } from '@/features/discussions/components/discussions-table/columns';
import { DataTable } from '@/features/discussions/components/discussions-table/data-table';

import { useDiscussions } from '../api/get-discussions';

export type DiscussionsListProps = {
  onDiscussionPrefetch?: (id: string) => void;
};

export const DiscussionsList = ({
  onDiscussionPrefetch,
}: DiscussionsListProps) => {
  const searchParams = useSearchParams();
  const page = searchParams?.get('page') ? Number(searchParams.get('page')) : 1;

  const discussionsQuery = useDiscussions({
    page: page,
  });

  if (discussionsQuery.isLoading) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  const discussions = discussionsQuery.data?.data;
  const discussionColumns = columns(onDiscussionPrefetch);

  if (!discussions) return null;

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={discussionColumns} data={discussions} />
    </div>
  );
};
