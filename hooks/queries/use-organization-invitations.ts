"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { GetOrganizationInvitationsParams } from "@/types/organization";

export const useOrganizationInvitations = (
  organizationId: string | undefined,
  params?: GetOrganizationInvitationsParams,
) => {
  return useQuery({
    queryKey: [
      "organization-invitations",
      organizationId,
      params,
    ],

    queryFn: () =>
      organizationService.getOrganizationInvitations(
        organizationId!,
        params,
      ),

    enabled: Boolean(organizationId),
  });
};