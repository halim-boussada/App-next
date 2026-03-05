"use client";

import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea
} from "@heroui/react";
import { createPost, updatePost, Post } from "@/lib/posts";
import { useRouter } from "next/navigation";

interface PostModalProps {
  post?: Post;
  isOpen: boolean;
  onClose: () => void;
}

export function PostModal({ post, isOpen, onClose }: PostModalProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditing = !!post;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    try {
      const result = isEditing
        ? await updatePost(post.id, formData)
        : await createPost(formData);

      if (result.success) {
        onClose();
        router.refresh();
      } else {
        setError(result.error || "Operation failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        <form onSubmit={handleSubmit}>
          <ModalHeader>
            <h3 className="text-xl font-bold">
              {isEditing ? "Edit Post" : "Create New Post"}
            </h3>
          </ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              {error && (
                <div className="bg-danger-50 dark:bg-danger-900/20 p-3 rounded-lg">
                  <p className="text-sm text-danger">{error}</p>
                </div>
              )}

              <Input
                name="title"
                label="Title"
                placeholder="Enter post title"
                defaultValue={post?.title || ""}
                isRequired
                variant="bordered"
              />

              <Textarea
                name="body"
                label="Content"
                placeholder="Enter post content"
                defaultValue={post?.body || ""}
                isRequired
                variant="bordered"
                minRows={6}
              />

              {!isEditing && (
                <Input
                  name="userId"
                  label="User ID"
                  placeholder="Enter user ID"
                  defaultValue="1"
                  type="number"
                  variant="bordered"
                />
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="flat"
              onPress={onClose}
              isDisabled={loading}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              type="submit"
              isLoading={loading}
            >
              {isEditing ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}
