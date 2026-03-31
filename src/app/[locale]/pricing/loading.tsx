import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

function PricingCardSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Skeleton className="h-5 w-24" />
        <div className="mt-4 flex items-baseline gap-1">
          <Skeleton className="h-10 w-28" />
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex-1 space-y-4 pt-6">
        <Skeleton className="h-3 w-16" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>
        <Skeleton className="mt-4 h-3 w-16" />
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-28" />
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-9 w-full" />
      </CardFooter>
    </Card>
  );
}

export default function PricingLoading() {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Skeleton className="h-6 w-24" />
        <div className="flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-9" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>
      <div className="flex-1 px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <Skeleton className="mx-auto h-10 w-48" />
            <Skeleton className="mx-auto mt-3 h-5 w-72" />
          </div>
          <div className="mb-8 flex justify-center">
            <Skeleton className="h-10 w-72" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
