"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { Post } from "@/lib/posts";
import { PostsList } from "./posts-list";

interface PostsPageClientProps {
  posts: Post[];
  total: number;
  currentPage: number;
  totalPages: number;
}

export function PostsPageClient({
  posts,
  total,
  currentPage,
  totalPages,
}: PostsPageClientProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Posts</h1>
          <p className="text-default-500 mt-2">
            Manage and view all posts ({total} total)
          </p>
        </div>
        <PostsList.CreateButton />
      </div>

      <PostsList posts={posts} />

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex gap-2 items-center">
            {currentPage > 1 && (
              <Link href={`/dashboard/posts?page=${currentPage - 1}`}>
                <Button size="sm" variant="flat">
                  Previous
                </Button>
              </Link>
            )}

            <span className="text-sm text-default-500">
              Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
              <Link href={`/dashboard/posts?page=${currentPage + 1}`}>
                <Button size="sm" variant="flat">
                  Next
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
