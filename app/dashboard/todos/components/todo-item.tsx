"use client";

import { Card, CardBody, Checkbox, Button, Chip } from "@heroui/react";
import { Todo } from "@/lib/todos";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center gap-3">
          <Checkbox
            isSelected={todo.completed}
            onValueChange={() => onToggle(todo.id)}
            color="success"
          />
          <div className="flex-1">
            <p
              className={`${
                todo.completed
                  ? "line-through text-default-400"
                  : "text-default-700"
              }`}
            >
              {todo.todo}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {todo.isCustom && (
              <Chip size="sm" color="secondary" variant="flat">
                Custom
              </Chip>
            )}
            {todo.isCustom && (
              <Button
                size="sm"
                color="danger"
                variant="flat"
                onPress={() => onDelete(todo.id)}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
