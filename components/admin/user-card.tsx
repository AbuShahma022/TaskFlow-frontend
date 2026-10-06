import { CheckCircle2, CircleUserRound } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { AdminUser } from "@/types/admin-user";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpdateAdminUserStatus } from "@/hooks/mutations/use-update-admin-user-status";

interface UserCardProps {
  user: AdminUser;
}

export function UserCard({ user }: UserCardProps) {
    const updateStatusMutation = useUpdateAdminUserStatus();

const nextStatus = user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE";

const handleStatusChange = () => {
  updateStatusMutation.mutate({
    userId: user.id,
    payload: {
      status: nextStatus,
    },
  });
};
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="size-full object-cover"
              />
            ) : (
              <CircleUserRound className="size-5 text-muted-foreground" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate font-medium">{user.name}</p>

                <p className="truncate text-sm text-muted-foreground">
                  {user.email}
                </p>
              </div>

              <Badge variant="outline">{user.role}</Badge>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                variant={user.status === "ACTIVE" ? "default" : "destructive"}
              >
                {user.status}
              </Badge>

              {user.emailVerified ? (
                <Badge variant="secondary">
                  <CheckCircle2 className="size-3.5" />
                  Verified
                </Badge>
              ) : (
                <Badge variant="outline">Not verified</Badge>
              )}
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Created {new Date(user.createdAt).toLocaleDateString()}
            </p>

            <Button
              variant={user.status === "ACTIVE" ? "destructive" : "default"}
              size="sm"
              className="mt-3 w-full"
              onClick={handleStatusChange}
              disabled={updateStatusMutation.isPending}
            >
              {updateStatusMutation.isPending ? (
                <>
                  <Loader2 className="animate-spin" />
                  Updating...
                </>
              ) : user.status === "ACTIVE" ? (
                "Block User"
              ) : (
                "Activate User"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}