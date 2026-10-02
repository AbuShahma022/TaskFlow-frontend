import { useQuery } from "@tanstack/react-query";

import { organizationService } from "@/services/organization.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useOrganizations = () => {
  return useQuery({
    queryKey: QUERY_KEYS.ORGANIZATIONS.LIST,
    queryFn: () => organizationService.getOrganizations(),
  });
};