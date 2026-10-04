"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useOrganization } from "@/providers/organization-provider";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { useSubscription } from "@/hooks/queries/use-subscription";
import { useCreateCheckout } from "@/hooks/mutations/use-create-checkout";
import { toast } from "sonner";
import { usePayments } from "@/hooks/queries/use-payments";

export default function SubscriptionPage() {
  const router = useRouter();

  const { selectedMembership } = useOrganization();
  const { organizationId } = useActiveOrganization();

  const { data, isLoading, isError } = useSubscription(
    organizationId ?? undefined
  );
 const {
  data: paymentsData,
  isLoading: paymentsLoading,
} = usePayments(organizationId ?? undefined);

const payments = paymentsData?.data?.data ?? [];
  const createCheckout = useCreateCheckout();

  const isManager = selectedMembership?.role === "MANAGER";

  useEffect(() => {
    if (selectedMembership && !isManager) {
      router.replace("/dashboard");
    }
  }, [selectedMembership, isManager, router]);

  const subscription = data?.data;

  const handleUpgrade = () => {
    if (!organizationId) {
      toast.error("Please select an organization.");
      return;
    }

    createCheckout.mutate(organizationId, {
      onSuccess: (response) => {
        window.location.href = response.data.checkoutUrl;
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create checkout session."
        );
      },
    });
  };

  if (!organizationId) {
    return (
      <div className="w-full min-w-0 p-4 sm:p-6">
        <div className="rounded-lg border p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">
            Please select an organization.
          </p>
        </div>
      </div>
    );
  }

  if (selectedMembership && !isManager) {
    return null;
  }

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">
          Subscription
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organization subscription and billing.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-lg border p-6 text-sm">
          Loading subscription...
        </div>
      )}

      {isError && (
        <div className="rounded-lg border p-6 text-sm text-destructive">
          Failed to load subscription.
        </div>
      )}

     {!isLoading && !isError && subscription && (
  <>
    {/* Subscription Card */}
    <div className="max-w-2xl rounded-xl border p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Current Plan
          </p>

          <h2 className="mt-1 text-2xl font-semibold">
            {subscription.plan}
          </h2>
        </div>

        <span className="w-fit rounded-md border px-3 py-1 text-xs font-medium">
          {subscription.status}
        </span>
      </div>

      {subscription.plan === "FREE" && (
        <div className="mt-6 border-t pt-6">
          <h3 className="font-medium">
            Upgrade to PRO
          </h3>

          <p className="mt-1 text-sm text-muted-foreground">
            Unlock the PRO plan for your organization.
          </p>

          <button
            type="button"
            onClick={handleUpgrade}
            disabled={createCheckout.isPending}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {createCheckout.isPending
              ? "Creating checkout..."
              : "Upgrade to PRO"}
          </button>
        </div>
      )}

      {subscription.plan === "PRO" && (
        <div className="mt-6 border-t pt-6">
          <p className="text-sm text-muted-foreground">
            Your organization is currently subscribed to the PRO plan.
          </p>

          {subscription.currentPeriodEnd && (
            <p className="mt-2 text-sm">
              Current period ends:{" "}
              <span className="font-medium">
                {new Date(
                  subscription.currentPeriodEnd
                ).toLocaleDateString()}
              </span>
            </p>
          )}
        </div>
      )}
    </div>

    {/* Payment History Card */}
    <div className="max-w-2xl rounded-xl border p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-semibold">
          Payment History
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          View your organization payment history.
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {paymentsLoading && (
          <p className="text-sm text-muted-foreground">
            Loading payment history...
          </p>
        )}

        {!paymentsLoading && payments.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No payments found.
          </p>
        )}

        {!paymentsLoading &&
          payments.map((payment) => (
            <div
              key={payment.id}
              className="rounded-lg border p-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">
                    {payment.provider}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>

                <span className="w-fit rounded-md border px-2 py-1 text-xs font-medium">
                  {payment.status}
                </span>
              </div>

              <div className="mt-3 text-sm">
                Amount:{" "}
                <span className="font-medium">
                  {payment.amount}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  </>
)}

      
    </div>
  );
}