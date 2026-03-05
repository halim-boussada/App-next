import { Card, CardHeader, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-default-500 mt-2">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Preferences</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-sm text-default-500">
              Settings configuration coming soon...
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Security</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-sm text-default-500">
              Security settings coming soon...
            </p>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Notifications</h3>
          </CardHeader>
          <Divider />
          <CardBody>
            <p className="text-sm text-default-500">
              Notification preferences coming soon...
            </p>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
