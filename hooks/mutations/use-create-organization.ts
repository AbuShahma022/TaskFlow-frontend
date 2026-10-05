"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { CreateOrganizationPayload } from "@/types/organization";

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrganizationPayload) =>
      organizationService.createOrganization(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORGANIZATIONS.LIST,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORGANIZATIONS.ALL,
      });
    },
  });
};