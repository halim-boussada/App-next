"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { refreshAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function DashboardClient() {
  const [refreshed, setRefreshed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const refresh = async () => {
      const result = await refreshAccessToken();
      if (!result.success) {
        router.push("/login");
      } else {
        setRefreshed(true);
      }
    };

    refresh();
  }, [router]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-default-500 mt-2">Welcome to your dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Quick Stats</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-default-500">Total Items</p>
                <p className="text-2xl font-bold">24</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Active</p>
                <p className="text-2xl font-bold">18</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Recent Activity</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-sm text-default-500">
              No recent activity to display
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Status</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            {refreshed && (
              <div className="bg-success-50 dark:bg-success-900/20 p-3 rounded-lg">
                <p className="text-sm text-success-700 dark:text-success-400">
                  ✓ Token refreshed successfully
                </p>
              </div>
            )}
            {!refreshed && (
              <p className="text-sm text-default-500">Checking status...</p>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
