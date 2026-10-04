"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskService } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { ICreateTask } from "@/types/task";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      sprintId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      sprintId: string;
      data: ICreateTask;
    }) =>
      taskService.createTask(
        organizationId,
        projectId,
        sprintId,
        data,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.TASKS.LIST(
          variables.organizationId,
          variables.projectId,
        ),
      });
    },
  });
};