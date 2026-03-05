import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Avatar } from "@heroui/avatar";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-default-500 mt-2">Manage your profile information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Personal Information</h3>
          </CardHeader>
          <Divider />
          <CardBody className="gap-4">
            <div className="flex items-center gap-4">
              <Avatar
                src={user.image}
                alt={fullName}
                className="w-20 h-20"
                isBordered
                color="primary"
              />
              <div>
                <p className="font-semibold text-lg">{fullName}</p>
                <p className="text-sm text-default-500">@{user.username}</p>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-default-500">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Gender</p>
                <p className="font-medium capitalize">{user.gender}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">User ID</p>
                <p className="font-medium">{user.id}</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Role</p>
                <p className="font-medium">{user.role || "User"}</p>
              </div>
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Account Details</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-default-500">Account Status</p>
                <p className="font-medium text-success">Active</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Member Since</p>
                <p className="font-medium">January 2024</p>
              </div>
              <div>
                <p className="text-sm text-default-500">Last Login</p>
                <p className="font-medium">Just now</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
