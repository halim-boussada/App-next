"use client";

import { useEffect } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";

export default function PostsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Posts error:", error);
  }, [error]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Card className="w-full max-w-md">
        <CardBody className="text-center space-y-4 py-8">
          <div className="text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold">Something went wrong!</h2>
          <p className="text-default-500">
            {error.message || "Failed to load posts. Please try again."}
          </p>
          {error.digest && (
            <p className="text-xs text-default-400">
              Error ID: {error.digest}
            </p>
          )}
        </CardBody>
        <CardFooter className="justify-center gap-2">
          <Button
            color="primary"
            onPress={reset}
          >
            Try Again
          </Button>
          <Button
            variant="flat"
            onPress={() => window.location.href = "/dashboard"}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
