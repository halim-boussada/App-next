"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardBody,
  Input,
  Button,
  Chip,
  Checkbox,
} from "@heroui/react";
import { Todo } from "@/lib/todos";
import { useDebounce } from "@/hooks/useDebounce";
import { TodoItem } from "./todo-item";
import { AddTodoModal } from "./add-todo-modal";

const STORAGE_KEY = "custom_todos";

interface TodosPageClientProps {
  initialTodos: Todo[];
  initialFilter: string;
  initialSearch: string;
}

export function TodosPageClient({
  initialTodos,
  initialFilter,
  initialSearch,
}: TodosPageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 500);
  const currentFilter = searchParams.get("filter") || "all";

  // Load custom todos from localStorage on mount
  useEffect(() => {
    const loadCustomTodos = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const customTodos: Todo[] = JSON.parse(stored);
          // Merge custom todos with API todos (custom todos first)
          setTodos((prevTodos) => [...customTodos, ...prevTodos]);
        }
      } catch (error) {
        console.error("Error loading custom todos:", error);
      }
    };

    loadCustomTodos();
  }, []);

  // Update URL when search changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }

    router.push(`/dashboard/todos?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "all") {
      params.delete("filter");
    } else {
      params.set("filter", filter);
    }

    router.push(`/dashboard/todos?${params.toString()}`);
  };

  // Filter and search todos
  const filteredTodos = useMemo(() => {
    let result = todos;

    // Apply status filter
    if (currentFilter === "completed") {
      result = result.filter((todo) => todo.completed);
    } else if (currentFilter === "pending") {
      result = result.filter((todo) => !todo.completed);
    }

    // Apply search filter
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      result = result.filter((todo) =>
        todo.todo.toLowerCase().includes(query)
      );
    }

    return result;
  }, [todos, currentFilter, debouncedSearch]);

  // Add new custom todo
  const handleAddTodo = (todoText: string) => {
    const newTodo: Todo = {
      id: Date.now(), // Use timestamp as ID for custom todos
      todo: todoText,
      completed: false,
      userId: 1,
      isCustom: true,
    };

    setTodos((prev) => [newTodo, ...prev]);

    // Save to localStorage
    saveCustomTodos([newTodo, ...getCustomTodos()]);
  };

  // Toggle todo completion
  const handleToggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    // Update localStorage if it's a custom todo
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    const customTodos = updatedTodos.filter((t) => t.isCustom);
    saveCustomTodos(customTodos);
  };

  // Delete custom todo
  const handleDeleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    // Update localStorage
    const customTodos = todos.filter((t) => t.isCustom && t.id !== id);
    saveCustomTodos(customTodos);
  };

  // Helper functions for localStorage
  const getCustomTodos = (): Todo[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  const saveCustomTodos = (customTodos: Todo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(customTodos));
    } catch (error) {
      console.error("Error saving custom todos:", error);
    }
  };

  const stats = {
    total: todos.length,
    completed: todos.filter((t) => t.completed).length,
    pending: todos.filter((t) => !t.completed).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Todos</h1>
          <p className="text-default-500 mt-2">
            Manage your tasks and todos
          </p>
        </div>
        <Button color="primary" onPress={() => setIsAddModalOpen(true)}>
          Add Todo
        </Button>
      </div>

      {/* Stats */}
      <div className="flex gap-4">
        <Card className="flex-1">
          <CardBody className="text-center">
            <p className="text-2xl font-bold">{stats.total}</p>
            <p className="text-sm text-default-500">Total</p>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-success">{stats.completed}</p>
            <p className="text-sm text-default-500">Completed</p>
          </CardBody>
        </Card>
        <Card className="flex-1">
          <CardBody className="text-center">
            <p className="text-2xl font-bold text-warning">{stats.pending}</p>
            <p className="text-sm text-default-500">Pending</p>
          </CardBody>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardBody className="gap-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={currentFilter === "all" ? "solid" : "flat"}
              color={currentFilter === "all" ? "primary" : "default"}
              onPress={() => handleFilterChange("all")}
            >
              All ({stats.total})
            </Button>
            <Button
              size="sm"
              variant={currentFilter === "completed" ? "solid" : "flat"}
              color={currentFilter === "completed" ? "success" : "default"}
              onPress={() => handleFilterChange("completed")}
            >
              Completed ({stats.completed})
            </Button>
            <Button
              size="sm"
              variant={currentFilter === "pending" ? "solid" : "flat"}
              color={currentFilter === "pending" ? "warning" : "default"}
              onPress={() => handleFilterChange("pending")}
            >
              Pending ({stats.pending})
            </Button>
          </div>

          <Input
            placeholder="Search todos..."
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

      {/* Todos List */}
      <div className="space-y-2">
        {filteredTodos.length === 0 ? (
          <Card>
            <CardBody className="text-center py-8">
              <p className="text-default-500">
                {debouncedSearch
                  ? "No todos found matching your search"
                  : "No todos to display"}
              </p>
            </CardBody>
          </Card>
        ) : (
          filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggleTodo}
              onDelete={handleDeleteTodo}
            />
          ))
        )}
      </div>

      {/* Add Todo Modal */}
      <AddTodoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddTodo}
      />
    </div>
  );
}
