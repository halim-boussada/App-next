"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
}

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export async function getPosts(
  page: number = 1,
  limit: number = 10,
): Promise<PostsResponse> {
  const skip = (page - 1) * limit;

  try {
    const response = await fetch(
      `https://dummyjson.com/posts?limit=${limit}&skip=${skip}`,
      { cache: "no-store" }, // SSR - always fetch fresh data
    );

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
}

export async function getPost(id: string): Promise<Post> {
  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`, {
      next: { revalidate: 3600 }, // ISR - revalidate every hour
    });

    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function createPost(formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;
  const userId = formData.get("userId") as string;

  if (!title || !body) {
    return {
      success: false,
      error: "Title and body are required",
    };
  }

  try {
    const response = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        body,
        userId: parseInt(userId) || 1,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to create post",
      };
    }

    const post = await response.json();

    // Revalidate the posts list page
    revalidatePath("/dashboard/posts");

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error("Error creating post:", error);
    return {
      success: false,
      error: "An error occurred while creating the post",
    };
  }
}

export async function updatePost(id: number, formData: FormData) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  const title = formData.get("title") as string;
  const body = formData.get("body") as string;

  if (!title || !body) {
    return {
      success: false,
      error: "Title and body are required",
    };
  }

  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to update post",
      };
    }

    const post = await response.json();

    // Revalidate the posts list and detail pages
    revalidatePath("/dashboard/posts");
    revalidatePath(`/dashboard/posts/${id}`);

    return {
      success: true,
      post,
    };
  } catch (error) {
    console.error("Error updating post:", error);
    return {
      success: false,
      error: "An error occurred while updating the post",
    };
  }
}

export async function deletePost(id: number) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Not authenticated",
    };
  }

  try {
    const response = await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to delete post",
      };
    }

    // Revalidate the posts list page
    revalidatePath("/dashboard/posts");

    return {
      success: true,
    };
  } catch (error) {
    console.error("Error deleting post:", error);
    return {
      success: false,
      error: "An error occurred while deleting the post",
    };
  }
}
