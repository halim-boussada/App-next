"use server";

export interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  isCustom?: boolean; // Flag for client-added todos
}

export interface TodosResponse {
  todos: Todo[];
  total: number;
  skip: number;
  limit: number;
}

export async function getTodos(limit: number = 30): Promise<TodosResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/todos?limit=${limit}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch todos");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
}

export async function searchTodos(query: string): Promise<TodosResponse> {
  try {
    const response = await fetch(
      `https://dummyjson.com/todos/search?q=${encodeURIComponent(query)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("Failed to search todos");
    }

    return response.json();
  } catch (error) {
    console.error("Error searching todos:", error);
    throw error;
  }
}
