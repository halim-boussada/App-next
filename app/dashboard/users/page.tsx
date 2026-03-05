import { getUsers } from "@/lib/users";
import { UsersPageClient } from "./components/users-page-client";

interface UsersPageProps {
  searchParams: Promise<{
    search?: string;
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const sortBy = params.sortBy || "";
  const order = params.order || "asc";

  // Fetch users from API with search and sort params
  const { users, total } = await getUsers({
    limit: 30,
    search,
    sortBy,
    order,
  });

  return (
    <UsersPageClient
      initialUsers={users}
      initialSearch={search}
      initialSortBy={sortBy}
      initialOrder={order}
      total={total}
    />
  );
}
