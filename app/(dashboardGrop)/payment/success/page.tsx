"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { subscriptionService } from "@/services/subscription.service";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";

export default function PaymentSuccessPage() {
    const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const router = useRouter();

  const { organizationId } = useActiveOrganization();

  const [isVerifying, setIsVerifying] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      toast.error("Payment session is missing.");
      setIsVerifying(false);
      return;
    }

    if (!organizationId) {
      return;
    }

    const verifyPayment = async () => {
      try {
        await subscriptionService.verifyPayment(organizationId, sessionId)

        await queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.SUBSCRIPTIONS.DETAIL(organizationId),
        })

        setVerified(true)
        toast.success("Payment verified successfully.")
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : "Payment verification failed."
        )
      } finally {
        setIsVerifying(false)
      }
    }

    verifyPayment();
  }, [organizationId, searchParams]);

  if (isVerifying) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-xl font-semibold">
            Verifying payment...
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-6">
      <div className="w-full max-w-md rounded-xl border p-6 text-center">
        {verified ? (
          <>
            <h1 className="text-2xl font-semibold">
              Payment Successful
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Your payment has been verified successfully.
            </p>

            <button
              type="button"
              onClick={() => router.push("/subscription")}
              className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            >
              View Subscription
            </button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold">
              Payment Verification Failed
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              We could not verify your payment.
            </p>

            <button
              type="button"
              onClick={() => router.push("/subscription")}
              className="mt-6 rounded-md border px-4 py-2 text-sm font-medium"
            >
              Back to Subscription
            </button>
          </>
        )}
      </div>
    </div>
  );
}