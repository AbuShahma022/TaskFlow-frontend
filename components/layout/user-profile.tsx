"use client";

import { useAuth } from "@/providers/auth-provider";

export function UserProfile() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex size-9 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
        {user.name.charAt(0).toUpperCase()}
      </div>

      <div className="hidden flex-col text-right sm:flex">
        <span className="text-sm font-medium leading-none">
          {user.name}
        </span>

        <span className="mt-1 text-xs text-muted-foreground">
          {user.email}
        </span>
      </div>
    </div>
  );
}