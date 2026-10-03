import api from "@/lib/axios";

import type {
  GetProjectsResponse,
  IGetProjectsQuery,
  ICreateProject,
  IProjectResponse,
  IUpdateProject,
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

  createProject: async (
    organizationId: string,
    data: ICreateProject,
  ) => {
    const response = await api.post(
      `/organizations/${organizationId}/projects`,
      data,
    );

    return response.data;
  },

  getProject: async (
    organizationId: string,
    projectId: string,
  ): Promise<IProjectResponse> => {
    const response = await api.get<IProjectResponse>(
      `/organizations/${organizationId}/projects/${projectId}`,
    );

    return response.data;
  },

  updateProject: async (
  organizationId: string,
  projectId: string,
  data: IUpdateProject,
) => {
  const response = await api.patch(
    `/organizations/${organizationId}/projects/${projectId}`,
    data,
  );

  return response.data;
},
};