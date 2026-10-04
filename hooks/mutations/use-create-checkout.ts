"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { subscriptionService } from "@/services/subscription.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useCreateCheckout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (organizationId: string) =>
      subscriptionService.createCheckout(organizationId),

    onSuccess: (_, organizationId) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SUBSCRIPTIONS.DETAIL(organizationId),
      });
    },
  });
};