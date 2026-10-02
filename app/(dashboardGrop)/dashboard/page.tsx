import { AppLayout } from "@/components/layout/app-layout";

export default function DashboardPage() {
  return (
    <AppLayout>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-muted-foreground">
          Welcome to TaskFlow.
        </p>
      </div>
    </AppLayout>
  );
}