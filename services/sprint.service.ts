import api from "@/lib/axios";

import type {
  ICreateSprint,
  ICreateSprintResponse,
  IGetSprintsQuery,
  IGetSprintsResponse,
} from "@/types/sprint";

export const sprintService = {
  createSprint: async (
    organizationId: string,
    projectId: string,
    data: ICreateSprint,
  ): Promise<ICreateSprintResponse> => {
    const response = await api.post<ICreateSprintResponse>(
      `/organizations/${organizationId}/projects/${projectId}/sprints`,
      data,
    );

    return response.data;
  },

    getSprints: async (
    organizationId: string,
    projectId: string,
    params?: IGetSprintsQuery,
  ): Promise<IGetSprintsResponse> => {
    const response = await api.get<IGetSprintsResponse>(
      `/organizations/${organizationId}/projects/${projectId}/sprints`,
      {
        params,
      },
    );

    return response.data;
  },
};