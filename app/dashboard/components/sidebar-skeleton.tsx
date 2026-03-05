import { Skeleton } from "@heroui/skeleton";

export function SidebarSkeleton() {
  return (
    <aside className="w-64 bg-content1 border-r border-divider flex flex-col">
      {/* User Profile Section Skeleton */}
      <div className="p-4 border-b border-divider">
        <div className="flex items-center gap-3">
          <Skeleton className="w-12 h-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24 rounded-lg" />
            <Skeleton className="h-3 w-20 rounded-lg" />
            <Skeleton className="h-5 w-16 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Navigation Section Skeleton */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {[1, 2, 3].map((item) => (
            <li key={item}>
              <Skeleton className="h-10 w-full rounded-lg" />
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section Skeleton */}
      <div className="p-4 border-t border-divider">
        <Skeleton className="h-6 w-full rounded-lg" />
      </div>
    </aside>
  );
}
