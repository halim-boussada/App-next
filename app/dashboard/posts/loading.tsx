import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function PostsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-4 w-48 rounded-lg" />
        </div>
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="w-full">
            <CardHeader className="space-y-3">
              <Skeleton className="h-6 w-3/4 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </CardHeader>
            <CardBody className="space-y-3">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-3 w-16 rounded-lg" />
                <Skeleton className="h-3 w-16 rounded-lg" />
              </div>
            </CardBody>
            <CardFooter className="gap-2">
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-16 rounded-lg" />
              <Skeleton className="h-8 w-24 rounded-lg ml-auto" />
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <Skeleton className="h-8 w-48 rounded-lg" />
      </div>
    </div>
  );
}
