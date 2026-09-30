import { Badge } from "@/components/ui/badge";
import type { OrganizationMembership } from "@/types/organization";

interface OrganizationCardProps {
  membership: OrganizationMembership;
}

export function OrganizationCard({
  membership,
}: OrganizationCardProps) {
  const { organization, role } = membership;

  return (
    <div className="rounded-xl border bg-card p-5 transition-colors hover:bg-accent/40">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-semibold">
            {organization.name}
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {organization.description || "No description"}
          </p>
        </div>

        <Badge variant="secondary">
          {role}
        </Badge>
      </div>
    </div>
  );
}