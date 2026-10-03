"use client";

import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";

export const useProject = (projectId: string) => {
  const { organizationId } = useActiveOrganization();

  return useQuery({
    queryKey: [
      QUERY_KEYS.PROJECTS.DETAIL,
      organizationId,
      projectId,
    ],

    queryFn: () =>
      projectService.getProject(
        organizationId!,
        projectId,
      ),

    enabled: Boolean(
      organizationId && projectId,
    ),
  });
};