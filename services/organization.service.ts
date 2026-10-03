import api from "@/lib/axios";
import type {
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  OrganizationListResponse,
  OrganizationMembersResponse,
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

  getOrganizationMembers: async (
  organizationId: string,
  params?: GetOrganizationMembersParams,
): Promise<OrganizationMembersResponse> => {
  const response = await api.get(
    `/organizations/${organizationId}/members`,
    {
      params,
    },
  );

  return response.data;
},
};