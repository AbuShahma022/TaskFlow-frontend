import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sprintService } from "@/services/sprint.service";
import { QUERY_KEYS } from "@/constants/query-keys";

export const useUpdateSprint = () => {
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
      data: {
        name?: string;
        goal?: string;
        startDate?: string;
        endDate?: string;
      };
    }) =>
      sprintService.updateSprint(
        organizationId,
        projectId,
        sprintId,
        data,
      ),

    onSuccess: (_, variables) => {
      // Refresh sprint list
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.SPRINTS.LIST(
          variables.organizationId,
          variables.projectId,
        ),
      });

      // Refresh project details
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.DETAIL(
          variables.projectId,
        ),
      });
    },
  });
};