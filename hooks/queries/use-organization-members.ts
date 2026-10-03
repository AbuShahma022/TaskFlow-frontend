import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { GetOrganizationMembersParams } from "@/types/organization";

export const useOrganizationMembers = (
  organizationId: string | undefined,
  params?: GetOrganizationMembersParams,
) => {
  return useQuery({
    queryKey: [
      ...QUERY_KEYS.ORGANIZATIONS.MEMBERS(
        organizationId ?? "",
      ),
      params,
    ],

    queryFn: () =>
      organizationService.getOrganizationMembers(
        organizationId!,
        params,
      ),

    enabled: !!organizationId,
  });
};