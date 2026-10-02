import { OrganizationList } from "@/components/organizations/organization-list";

export default function OrganizationsPage() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Organizations
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage and access your organizations.
        </p>
      </div>

      <OrganizationList />
    </main>
  );
}