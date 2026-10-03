import api from "@/lib/axios";

import type {
  ICreateSprint,
  ICreateSprintResponse,
  IGetSprintsQuery,
  IGetSprintsResponse,
  ISprintResponse,
  IUpdateSprint,
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

  updateSprint: async (
  organizationId: string,
  projectId: string,
  sprintId: string,
  data: IUpdateSprint,
) => {
  const response = await api.patch(
    `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}`,
    data,
  );

  return response.data;
},
archiveSprint: async (
  organizationId: string,
  projectId: string,
  sprintId: string,
): Promise<ISprintResponse> => {
  const response = await api.patch(
    `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}/archive`,
  );

  return response.data;
},

startSprint: async (
  organizationId: string,
  projectId: string,
  sprintId: string,
): Promise<ISprintResponse> => {
  const response = await api.patch<ISprintResponse>(
    `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}/start`,
  );

  return response.data;
},

completeSprint: async (
  organizationId: string,
  projectId: string,
  sprintId: string,
): Promise<ISprintResponse> => {
  const response = await api.patch<ISprintResponse>(
    `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}/complete`,
  );

  return response.data;
},

};