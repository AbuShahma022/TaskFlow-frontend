"use client";

import { useMe } from "@/hooks/queries/use-me";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";

export default function ProfilePage() {
  const { data, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6">
        Loading profile...
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full p-4 sm:p-6 text-destructive">
        Failed to load profile.
      </div>
    );
  }

  const user = data.data;

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">Profile</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your profile information.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage src={user.avatar ?? undefined} alt={user.name} />

            <AvatarFallback>
              {user.name
                .split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div>
            <h2 className="text-lg font-semibold">{user.name}</h2>

            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
            <EditProfileDialog name={user.name} />


        </div>
       
         
        <div className="mt-4 space-y-2 text-sm">
          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>

          <p>
            <span className="font-medium">Status:</span> {user.status}
          </p>

          <p>
            <span className="font-medium">Email verified:</span>{" "}
            {user.emailVerified ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  )
}