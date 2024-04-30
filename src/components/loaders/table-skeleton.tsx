import { Skeleton } from "@components/ui/skeleton";

export default function TableSkeleton() {
  return (
    <div className="w-full flex flex-col space-y-2" data-cy="loading-table">
      <div className="w-full flex justify-between">
        <div className="flex gap-1">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-[105px]" />
          <Skeleton className="h-8 w-[105px]" />
        </div>
        <Skeleton className="h-8 w-[98px]" />
      </div>
      <Skeleton className="h-96 w-full rounded-md" />
    </div>
  );
}
