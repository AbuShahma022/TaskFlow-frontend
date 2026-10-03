"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { ICreateProject } from "@/types/project";

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      data,
    }: {
      organizationId: string;
      data: ICreateProject;
    }) => projectService.createProject(organizationId, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          QUERY_KEYS.PROJECTS.LIST,
          variables.organizationId,
        ],
      });
    },
  });
};