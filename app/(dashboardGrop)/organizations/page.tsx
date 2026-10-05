import CreateOrganizationDialog from "@/components/organizations/create-organization-dialog";
import { OrganizationList } from "@/components/organizations/organization-list";

export default function OrganizationsPage() {
  return (
    <main className="container mx-auto space-y-6 px-4 py-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Organizations
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage and access your organizations.
          </p>
        </div>

        <CreateOrganizationDialog />
      </div>

      <OrganizationList />
    </main>
  );
}