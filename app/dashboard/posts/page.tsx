import { getPosts } from "@/lib/posts";
import { PostsPageClient } from "./components/posts-page-client";

interface PostsPageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function PostsPage({ searchParams }: PostsPageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const limit = 10;

  const { posts, total } = await getPosts(currentPage, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <PostsPageClient
      posts={posts}
      total={total}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
