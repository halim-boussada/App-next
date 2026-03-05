import { getPost, getPosts } from "@/lib/posts";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

// Generate static params for the first 10 posts
export async function generateStaticParams() {
  const { posts } = await getPosts(1, 10);

  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  let post;
  try {
    post = await getPost(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/posts">
          <Button variant="flat" size="sm">
            ← Back to Posts
          </Button>
        </Link>
      </div>

      <Card className="w-full">
        <CardHeader className="flex flex-col items-start gap-3">
          <div className="flex justify-between w-full items-start">
            <div className="flex-1">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <p className="text-sm text-default-500 mt-1">Post #{post.id}</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {post.tags?.map((tag) => (
              <Chip key={tag} size="sm" variant="flat" color="primary">
                {tag}
              </Chip>
            ))}
          </div>
        </CardHeader>

        <Divider />

        <CardBody>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-default-500 mb-2">
                Content
              </h3>
              <p className="text-default-700 leading-relaxed whitespace-pre-wrap">
                {post.body}
              </p>
            </div>

            <Divider />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-default-500">User ID</p>
                <p className="text-lg font-semibold">{post.userId}</p>
              </div>
              <div>
                <p className="text-xs text-default-500">Views</p>
                <p className="text-lg font-semibold">
                  👁 {post.views || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-default-500">Likes</p>
                <p className="text-lg font-semibold">
                  👍 {post.reactions?.likes || 0}
                </p>
              </div>
              <div>
                <p className="text-xs text-default-500">Dislikes</p>
                <p className="text-lg font-semibold">
                  👎 {post.reactions?.dislikes || 0}
                </p>
              </div>
            </div>
          </div>
        </CardBody>

        <Divider />

        <CardFooter className="gap-2">
          <Link href={`/dashboard/posts?edit=${post.id}`}>
            <Button color="primary" variant="flat">
              Edit Post
            </Button>
          </Link>
          <Link href="/dashboard/posts">
            <Button variant="bordered">Back to List</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
