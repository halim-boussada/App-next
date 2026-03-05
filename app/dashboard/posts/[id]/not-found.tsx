import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import Link from "next/link";

export default function PostNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardBody className="text-center space-y-4 py-8">
          <div className="text-6xl">🔍</div>
          <h2 className="text-2xl font-bold">Post Not Found</h2>
          <p className="text-default-500">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </CardBody>
        <CardFooter className="justify-center gap-2">
          <Link href="/dashboard/posts">
            <Button color="primary">
              Back to Posts
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="flat">
              Go to Dashboard
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
