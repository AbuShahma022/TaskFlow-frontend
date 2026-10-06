"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Building2 } from "lucide-react";

import { useOrganization } from "@/providers/organization-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CurrentOrganizationCard() {
  const router = useRouter();
  const { selectedMembership } = useOrganization();

  if (!selectedMembership) {
    return (
      <Card>
        <CardContent className="flex min-h-40 items-center justify-center">
          <div className="text-center">
            <Building2 className="mx-auto mb-3 size-8 text-muted-foreground" />

            <h3 className="font-semibold">
              No organization selected
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Create or join an organization to get started.
            </p>

            <Button
              className="mt-4"
              size="sm"
              onClick={() => router.push("/organizations")}
            >
              View Organizations
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { organization, role } = selectedMembership;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted">
              <Building2 className="size-5" />
            </div>

            <div className="min-w-0">
              <CardTitle className="truncate">
                {organization.name}
              </CardTitle>

              <p className="mt-1 truncate text-sm text-muted-foreground">
                {organization.slug}
              </p>
            </div>
          </div>

          <Badge variant="secondary">
            {role}
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">
          {organization.description || "No organization description."}
        </p>

        <Button
          className="mt-4"
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(`/organizations/${organization.id}/members`)
          }
        >
          Open Organization
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
}