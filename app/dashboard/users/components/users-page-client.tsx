"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Avatar,
  Card,
  CardBody,
} from "@heroui/react";
import { User } from "@/lib/users";
import { useDebounce } from "@/hooks/useDebounce";

interface UsersPageClientProps {
  initialUsers: User[];
  initialSearch: string;
  initialSortBy: string;
  initialOrder: "asc" | "desc";
  total: number;
}

type SortColumn = "firstName" | "age" | "company.department" | "";

export function UsersPageClient({
  initialUsers,
  initialSearch,
  initialSortBy,
  initialOrder,
  total,
}: UsersPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [users, setUsers] = useState<User[]>(initialUsers);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const currentSortBy = (searchParams.get("sortBy") || "") as SortColumn;
  const currentOrder = (searchParams.get("order") || "asc") as "asc" | "desc";

  // Update users when initialUsers changes (after server re-fetch)
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // Update URL when search changes (debounced)
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`/dashboard/users?${params.toString()}`);
    router.refresh(); // Trigger server-side re-fetch
  }, [debouncedSearch, router, searchParams]);

  // Handle sort change
  const handleSort = (column: SortColumn) => {
    const params = new URLSearchParams(searchParams.toString());

    if (currentSortBy === column) {
      // Toggle order
      const newOrder = currentOrder === "asc" ? "desc" : "asc";
      params.set("order", newOrder);
    } else {
      // New column, default to asc
      params.set("sortBy", column);
      params.set("order", "asc");
    }

    router.push(`/dashboard/users?${params.toString()}`);
    router.refresh(); // Trigger server-side re-fetch
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = [
      "ID",
      "First Name",
      "Last Name",
      "Age",
      "Email",
      "Phone",
      "Department",
      "Company",
      "City",
      "Country",
    ];

    const rows = users.map((user) => [
      user.id,
      user.firstName,
      user.lastName,
      user.age,
      user.email,
      user.phone,
      user.company.department,
      user.company.name,
      user.address.city,
      user.address.country,
    ]);

    // Create CSV content
    const csvContent = [
      headers.join(","),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")
      ),
    ].join("\n");

    // Create and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `users_export_${Date.now()}.csv`);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get sort indicator
  const getSortIndicator = (column: SortColumn) => {
    if (currentSortBy !== column) return null;

    return currentOrder === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-default-500 mt-2">
            Manage and search through {total} users
          </p>
        </div>
        <Button color="success" onPress={handleExportCSV}>
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardBody className="text-center">
            <p className="text-2xl font-bold">{total}</p>
            <p className="text-sm text-default-500">Total Users</p>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardBody className="text-center">
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-sm text-default-500">Displayed</p>
          </CardBody>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardBody>
          <Input
            placeholder="Search users by name, email, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            isClearable
            onClear={() => setSearchQuery("")}
            startContent={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            }
          />
        </CardBody>
      </Card>

      {/* Users Table */}
      <Card>
        <CardBody className="p-0">
          <Table aria-label="Users table with sorting">
            <TableHeader>
              <TableColumn>USER</TableColumn>
              <TableColumn>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => handleSort("firstName")}
                  className="font-semibold"
                >
                  NAME{getSortIndicator("firstName")}
                </Button>
              </TableColumn>
              <TableColumn>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => handleSort("age")}
                  className="font-semibold"
                >
                  AGE{getSortIndicator("age")}
                </Button>
              </TableColumn>
              <TableColumn>
                <Button
                  size="sm"
                  variant="light"
                  onPress={() => handleSort("company.department")}
                  className="font-semibold"
                >
                  DEPARTMENT{getSortIndicator("company.department")}
                </Button>
              </TableColumn>
              <TableColumn>CONTACT</TableColumn>
              <TableColumn>LOCATION</TableColumn>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    <p className="text-default-500">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar
                        src={user.image}
                        alt={`${user.firstName} ${user.lastName}`}
                        size="sm"
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-default-500">{user.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{user.age}</TableCell>
                    <TableCell>
                      <Chip size="sm" color="primary" variant="flat">
                        {user.company.department}
                      </Chip>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{user.phone}</p>
                        <p className="text-xs text-default-500">
                          {user.company.name}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm">{user.address.city}</p>
                        <p className="text-xs text-default-500">
                          {user.address.country}
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}
