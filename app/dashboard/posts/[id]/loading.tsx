import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

export default function PostDetailLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-32 rounded-lg" />
      </div>

      <Card className="w-full">
        <CardHeader className="flex flex-col items-start gap-3">
          <div className="w-full space-y-2">
            <Skeleton className="h-8 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-24 rounded-lg" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
        </CardHeader>

        <CardBody>
          <div className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-5/6 rounded-lg" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-16 rounded-lg" />
                  <Skeleton className="h-6 w-20 rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        </CardBody>

        <CardFooter className="gap-2">
          <Skeleton className="h-10 w-24 rounded-lg" />
          <Skeleton className="h-10 w-32 rounded-lg" />
        </CardFooter>
      </Card>
    </div>
  );
}
