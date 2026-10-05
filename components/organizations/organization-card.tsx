"use client";

import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import EditOrganizationDialog from "@/components/organizations/edit-organization-dialog";
import type { OrganizationMembership } from "@/types/organization";

interface OrganizationCardProps {
  membership: OrganizationMembership;
}

export function OrganizationCard({
  membership,
}: OrganizationCardProps) {
  const router = useRouter();

  const { organization, role } = membership;

  const isManager = role === "MANAGER";

  const handleOpenOrganization = () => {
    router.push(
      `/organizations/${organization.id}/members`,
    );
  };

  return (
    <div
      onClick={handleOpenOrganization}
      className="cursor-pointer rounded-xl border bg-card p-5 transition-colors hover:bg-accent/40"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">
            {organization.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {organization.description || "No description"}
          </p>
        </div>

        <div
          className="flex shrink-0 items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Badge variant="secondary">
            {role}
          </Badge>

          {isManager && (
            <EditOrganizationDialog
              organization={organization}
            />
          )}
        </div>
      </div>
    </div>
  );
}