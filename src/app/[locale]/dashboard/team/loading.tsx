import { Skeleton } from '@/components/ui/skeleton';

export default function TeamLoading() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-9 w-28" />
        <Skeleton className="mt-2 h-5 w-56" />
      </div>
      <div className="rounded-lg border p-6">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-3 h-5 w-48" />
        <Skeleton className="mt-4 h-48 w-full" />
      </div>
    </div>
  );
}
