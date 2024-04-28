import { Skeleton } from "@components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="w-full flex flex-col space-y-2" data-cy="loading-table">
      <div className="w-full flex justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-8 w-[98px]" />
      </div>
      <Skeleton className="h-96 w-full rounded-md" />
    </div>
  );
}
