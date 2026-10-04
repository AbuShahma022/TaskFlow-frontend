import api from "@/lib/axios";

import type {
  ICreateTask,
  IGetTasksQuery,
  IGetTasksResponse,
  IUpdateTask,
  TaskStatus,
} from "@/types/task";

export const taskService = {
  createTask: async (
    organizationId: string,
    projectId: string,
    sprintId: string,
    data: ICreateTask,
  ) => {
    const response = await api.post(
      `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}/tasks`,
      data,
    );

    return response.data;
  },

getTasks: async (
  organizationId: string,
  projectId: string,
  params?: IGetTasksQuery,
): Promise<IGetTasksResponse> => {
  const response = await api.get<IGetTasksResponse>(
    `/organizations/${organizationId}/projects/${projectId}/tasks`,
    {
      params,
    },
  );

  return response.data;
},

  updateTask: async (
    organizationId: string,
    projectId: string,
    sprintId: string,
    taskId: string,
    data: IUpdateTask,
  ) => {
    const response = await api.patch(
      `/organizations/${organizationId}/projects/${projectId}/sprints/${sprintId}/tasks/${taskId}`,
      data,
    );

    return response.data;
  },
  updateTaskStatus: async (
  organizationId: string,
  projectId: string,
  taskId: string,
  status: TaskStatus,
) => {
  const response = await api.patch(
    `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/status`,
    { status },
  );

  return response.data;
},

assignTask: async (
  organizationId: string,
  projectId: string,
  taskId: string,
  assignedToId: string,
) => {
  const response = await api.patch(
    `/organizations/${organizationId}/projects/${projectId}/tasks/${taskId}/assign`,
    { assignedToId },
  );

  return response.data;
},
};