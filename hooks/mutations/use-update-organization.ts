"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { UpdateOrganizationPayload } from "@/types/organization";

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      payload,
    }: {
      organizationId: string;
      payload: UpdateOrganizationPayload;
    }) =>
      organizationService.updateOrganization(
        organizationId,
        payload,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORGANIZATIONS.DETAIL(
          variables.organizationId,
        ),
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORGANIZATIONS.LIST,
      });

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.ORGANIZATIONS.ALL,
      });
    },
  });
};