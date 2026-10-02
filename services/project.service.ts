import api from "@/lib/axios";
import type {
  GetProjectsResponse,
  IGetProjectsQuery,
} from "@/types/project";

export const projectService = {
  getProjects: async (
    organizationId: string,
    params?: IGetProjectsQuery,
  ): Promise<GetProjectsResponse> => {
    const response = await api.get(
      `/organizations/${organizationId}/projects`,
      {
        params,
      },
    );

    return response.data;
  },
};