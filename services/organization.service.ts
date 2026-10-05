import api from "@/lib/axios";
import type {
  CreateOrganizationPayload,
  CreateOrganizationResponse,
  GetOrganizationMembersParams,
  GetOrganizationsParams,
  OrganizationListResponse,
  OrganizationMembersResponse,
  OrganizationResponse
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
getOrganizationById: async (
  organizationId: string,
): Promise<OrganizationResponse> => {
  const response = await api.get<OrganizationResponse>(
    `/organizations/${organizationId}`,
  );

  return response.data;
},

createOrganization: async (
  payload: CreateOrganizationPayload,
): Promise<CreateOrganizationResponse> => {
  const response = await api.post<CreateOrganizationResponse>(
    "/organizations",
    payload,
  );

  return response.data;
},
};