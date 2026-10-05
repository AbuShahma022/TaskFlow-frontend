"use client";

import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services/organization.service";
import type { GetOrganizationInvitationsParams } from "@/types/organization";

export const useMyOrganizationInvitations = (
  params?: GetOrganizationInvitationsParams,
) => {
  return useQuery({
    queryKey: [
      "my-organization-invitations",
      params,
    ],

    queryFn: () =>
      organizationService.getMyOrganizationInvitations(
        params,
      ),
  });
};