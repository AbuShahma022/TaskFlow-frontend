"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IUpdateProject } from "@/types/project";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      data: IUpdateProject;
    }) =>
      projectService.updateProject(
        organizationId,
        projectId,
        data,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.PROJECTS.DETAIL,
          variables.organizationId,
          variables.projectId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.PROJECTS.LIST,
          variables.organizationId,
        ],
      });
    },
  });
};