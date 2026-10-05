"use client";

import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useOrganizationById = (
  organizationId: string | undefined,
) => {
  return useQuery({
    queryKey: QUERY_KEYS.ORGANIZATIONS.DETAIL(organizationId ?? ""),
    queryFn: () =>
      organizationService.getOrganizationById(organizationId!),
    enabled: Boolean(organizationId),
  });
};