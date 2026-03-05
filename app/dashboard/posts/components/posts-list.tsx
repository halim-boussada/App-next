"use client";

import { useState, useOptimistic } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Divider
} from "@heroui/react";
import Link from "next/link";
import { Post, deletePost } from "@/lib/posts";
import { useRouter } from "next/navigation";
import { PostModal } from "./post-modal";

interface PostsListProps {
  posts: Post[];
}

function PostsListClient({ posts }: PostsListProps) {
  const router = useRouter();
  const [optimisticPosts, setOptimisticPosts] = useOptimistic(
    posts,
    (state, postIdToRemove: number) => state.filter((post) => post.id !== postIdToRemove)
  );
  const [error, setError] = useState<string | null>(null);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const handleDelete = async (postId: number) => {
    // Optimistically remove the post
    setOptimisticPosts(postId);
    setError(null);

    // Attempt to delete on server
    const result = await deletePost(postId);

    if (!result.success) {
      // Revert on error
      setError(result.error || "Failed to delete post");
      // Refresh to restore the post
      router.refresh();
    } else {
      // Success - refresh to get updated list from server
      router.refresh();
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Card className="border-danger">
          <CardBody>
            <p className="text-danger text-sm">{error}</p>
          </CardBody>
        </Card>
      )}

      {optimisticPosts.length === 0 ? (
        <Card>
          <CardBody>
            <p className="text-center text-default-500">No posts found</p>
          </CardBody>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {optimisticPosts.map((post) => (
            <Card key={post.id} className="w-full">
              <CardHeader className="flex justify-between items-start">
                <div className="flex-1">
                  <Link
                    href={`/dashboard/posts/${post.id}`}
                    className="hover:underline"
                  >
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                  </Link>
                  <div className="flex gap-2 mt-2">
                    {post.tags?.slice(0, 3).map((tag) => (
                      <Chip key={tag} size="sm" variant="flat">
                        {tag}
                      </Chip>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody>
                <p className="text-sm text-default-600 line-clamp-2">
                  {post.body}
                </p>
                <div className="flex gap-4 mt-4 text-xs text-default-500">
                  <span>👍 {post.reactions?.likes || 0} likes</span>
                  <span>👁 {post.views || 0} views</span>
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="gap-2">
                <Button
                  size="sm"
                  variant="flat"
                  color="primary"
                  onPress={() => setEditingPost(post)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="flat"
                  color="danger"
                  onPress={() => handleDelete(post.id)}
                >
                  Delete
                </Button>
                <Link href={`/dashboard/posts/${post.id}`} className="ml-auto">
                  <Button size="sm" variant="bordered">
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {editingPost && (
        <PostModal
          post={editingPost}
          isOpen={true}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
}

function CreateButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button color="primary" onPress={() => setIsOpen(true)}>
        Create Post
      </Button>
      <PostModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export const PostsList = Object.assign(PostsListClient, {
  CreateButton,
});
