import { useQuery } from "@tanstack/react-query";
import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { GetOrganizationsParams } from "@/types/organization";

export const useOrganizations = (
  params?: GetOrganizationsParams,
) => {
  return useQuery({
    queryKey: [...QUERY_KEYS.ORGANIZATIONS.LIST, params],
    queryFn: () => organizationService.getOrganizations(params),
  });
};