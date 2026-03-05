import { Avatar } from "@heroui/avatar";
import { Chip } from "@heroui/chip";

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  role?: string;
}

interface UserProfileProps {
  user: User;
}

export function UserProfile({ user }: UserProfileProps) {
  const fullName = `${user.firstName} ${user.lastName}`;
  const role = user.role || "User";

  return (
    <div className="flex items-center gap-3">
      <Avatar
        src={user.image}
        alt={fullName}
        className="w-12 h-12"
        isBordered
        color="primary"
      />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{fullName}</p>
        <p className="text-xs text-default-500 truncate">@{user.username}</p>
        <Chip size="sm" color="primary" variant="flat" className="mt-1">
          {role}
        </Chip>
      </div>
    </div>
  );
}
