"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";

import { useOrganizations } from "@/hooks/queries/use-organizations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function OrganizationOverview() {
  const router = useRouter();

  const { data, isLoading, isError } = useOrganizations({
    page: 1,
    limit: 5,
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-muted-foreground">
          Loading organizations...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Organizations</CardTitle>
        </CardHeader>

        <CardContent className="text-sm text-destructive">
          Failed to load organizations.
        </CardContent>
      </Card>
    );
  }

  const organizations = data?.data ?? [];
  const total = data?.meta.total ?? organizations.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Organizations</CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            {total} organization{total !== 1 ? "s" : ""}
          </p>
        </div>

        <Building2 className="size-5 text-muted-foreground" />
      </CardHeader>

      <CardContent className="space-y-3">
        {organizations.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No organizations found.
          </p>
        ) : (
          organizations.map((membership) => (
            <div
              key={membership.id}
              className="flex items-center justify-between gap-3 rounded-lg border p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {membership.organization.name}
                </p>

                <p className="truncate text-xs text-muted-foreground">
                  {membership.organization.slug}
                </p>
              </div>

              <Badge variant="secondary">
                {membership.role}
              </Badge>
            </div>
          ))
        )}

        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.push("/organizations")}
        >
          View all organizations
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}