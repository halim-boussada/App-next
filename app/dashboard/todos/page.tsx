import { getTodos } from "@/lib/todos";
import { TodosPageClient } from "./components/todos-page-client";

interface TodosPageProps {
  searchParams: Promise<{ filter?: string; search?: string }>;
}

export default async function TodosPage({ searchParams }: TodosPageProps) {
  const params = await searchParams;
  const filter = params.filter || "all";
  const searchQuery = params.search || "";

  // Fetch initial todos from API
  const { todos } = await getTodos(30);

  return (
    <TodosPageClient
      initialTodos={todos}
      initialFilter={filter}
      initialSearch={searchQuery}
    />
  );
}
