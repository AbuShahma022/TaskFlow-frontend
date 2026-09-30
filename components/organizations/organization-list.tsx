"use client";
import { OrganizationCard } from "./organization-card";
import { useOrganizations } from "@/hooks/queries/use-organizations";
import { Card, CardContent } from "@/components/ui/card";

export function OrganizationList() {
  const { data, isLoading, isError } = useOrganizations({
    page: 1,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading organizations...</div>;
  }

  if (isError) {
    return <div>Failed to load organizations.</div>;
  }

 if (!data?.data.length) {
  return (
    <Card>
      <CardContent className="flex min-h-48 items-center justify-center">
        <div className="text-center">
          <h3 className="font-semibold">
            No organizations yet
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            You are not a member of any organization yet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

  return (
    <div className="space-y-4">
      {data.data.map((membership) => (
        <OrganizationCard key={membership.id} membership={membership} />
      ))}
    </div>
  )
}