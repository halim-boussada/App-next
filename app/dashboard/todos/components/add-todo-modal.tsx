"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
} from "@heroui/react";

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: string) => void;
}

export function AddTodoModal({ isOpen, onClose, onAdd }: AddTodoModalProps) {
  const [todoText, setTodoText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (todoText.trim()) {
      onAdd(todoText.trim());
      setTodoText("");
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h3 className="text-xl font-bold">Add New Todo</h3>
          </ModalHeader>
          <ModalBody>
            <Textarea
              label="Todo"
              placeholder="Enter your todo..."
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              minRows={3}
              variant="bordered"
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isDisabled={!todoText.trim()}
            >
              Add Todo
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
