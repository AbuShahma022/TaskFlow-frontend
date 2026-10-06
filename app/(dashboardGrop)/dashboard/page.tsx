import { CurrentOrganizationCard } from "@/components/dashboard/current-organization-card";
import { OrganizationOverview } from "@/components/dashboard/organization-overview";
import { QuickActions } from "@/components/dashboard/quick-actions";

export default function DashboardPage() {
  return (
    <main className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Welcome back to TaskFlow.
        </p>
      </div>

      <CurrentOrganizationCard />
      <QuickActions />
      <OrganizationOverview/>
    </main>
  );
}