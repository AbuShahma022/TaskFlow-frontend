"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { taskService } from "@/services/task.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useAssignTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      taskId,
      assignedToId,
    }: {
      organizationId: string;
      projectId: string;
      taskId: string;
      assignedToId: string;
    }) =>
      taskService.assignTask(
        organizationId,
        projectId,
        taskId,
        assignedToId,
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