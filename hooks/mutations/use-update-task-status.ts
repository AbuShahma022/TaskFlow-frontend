"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskService } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { TaskStatus } from "@/types/task";

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      taskId,
      status,
    }: {
      organizationId: string;
      projectId: string;
      taskId: string;
      status: TaskStatus;
    }) =>
      taskService.updateTaskStatus(
        organizationId,
        projectId,
        taskId,
        status,
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