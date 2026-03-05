"use client";

import { useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { loginAction } from "./actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await loginAction(username, password);

      if (result.success) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError(result.error || "Login failed");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col gap-1 items-start">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-sm text-default-500">
            Use credentials from dummyjson.com
          </p>
        </CardHeader>
        <Divider />
        <CardBody>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              isRequired
              autoComplete="username"
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
              autoComplete="current-password"
            />
            {error && (
              <div className="text-danger text-sm">{error}</div>
            )}
            <Button
              type="submit"
              color="primary"
              isLoading={loading}
              className="w-full"
            >
              Login
            </Button>
          </form>
        </CardBody>
        <Divider />
        <CardFooter>
          <p className="text-sm text-default-500">
            Try: username: <code className="text-xs">emilys</code>, password: <code className="text-xs">emilyspass</code>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
