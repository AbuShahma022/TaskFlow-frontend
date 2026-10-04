"use client";

import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const usePayments = (
  organizationId: string | undefined
) => {
  return useQuery({
 queryKey: QUERY_KEYS.PAYMENTS.LIST(organizationId ?? ""),
    queryFn: () =>
      subscriptionService.getPayments(organizationId!),
    enabled: Boolean(organizationId),
  });
};