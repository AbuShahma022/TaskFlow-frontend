"use client";

import { useRouter } from "next/navigation";
import {
  Building2,
  FolderKanban,
  ListTodo,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuickActions() {
  const router = useRouter();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="h-auto justify-start gap-3 p-4"
            onClick={() => router.push("/organizations")}
          >
            <Building2 className="size-5" />

            <div className="text-left">
              <p className="font-medium">Organizations</p>
              <p className="text-xs text-muted-foreground">
                Manage organizations
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 p-4"
            onClick={() => router.push("/projects")}
          >
            <FolderKanban className="size-5" />

            <div className="text-left">
              <p className="font-medium">Projects</p>
              <p className="text-xs text-muted-foreground">
                View your projects
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 p-4"
            onClick={() => router.push("/tasks")}
          >
            <ListTodo className="size-5" />

            <div className="text-left">
              <p className="font-medium">Tasks</p>
              <p className="text-xs text-muted-foreground">
                Manage your tasks
              </p>
            </div>
          </Button>

          <Button
            variant="outline"
            className="h-auto justify-start gap-3 p-4"
            onClick={() => router.push("/invitations")}
          >
            <Mail className="size-5" />

            <div className="text-left">
              <p className="font-medium">Invitations</p>
              <p className="text-xs text-muted-foreground">
                View invitations
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}