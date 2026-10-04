"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskService } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IUpdateTask } from "@/types/task";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      sprintId,
      taskId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      sprintId: string;
      taskId: string;
      data: IUpdateTask;
    }) =>
      taskService.updateTask(
        organizationId,
        projectId,
        sprintId,
        taskId,
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