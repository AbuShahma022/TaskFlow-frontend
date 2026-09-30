import api from "@/lib/axios";
import type {
  GetOrganizationsParams,
  OrganizationListResponse,
} from "@/types/organization";

export const organizationService = {
  getOrganizations: async (
    params?: GetOrganizationsParams,
  ): Promise<OrganizationListResponse> => {
    const response = await api.get<OrganizationListResponse>(
      "/organizations",
      {
        params,
      },
    );

    return response.data;
  },
};