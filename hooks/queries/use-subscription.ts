"use client";

import { useQuery } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useSubscription = (
  organizationId: string | undefined
) => {
  return useQuery({
    queryKey: QUERY_KEYS.SUBSCRIPTIONS.DETAIL(organizationId ?? ""),
    queryFn: () => subscriptionService.getSubscription(organizationId!),
    enabled: Boolean(organizationId),
  });
};