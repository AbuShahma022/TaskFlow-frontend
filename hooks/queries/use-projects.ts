"use client";

import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { IGetProjectsQuery } from "@/types/project";

export const useProjects = (params?: IGetProjectsQuery) => {
  const { organizationId } = useActiveOrganization();
  

  return useQuery({
    queryKey: [
      QUERY_KEYS.PROJECTS.LIST,
      organizationId,
      params,
    ],
    queryFn: () =>
      projectService.getProjects(
        organizationId!,
        params,
      ),
    enabled: Boolean(organizationId),
  });
};