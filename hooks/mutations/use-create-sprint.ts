import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sprintService } from "@/services/sprint.service";
import { QUERY_KEYS } from "@/constants/query-keys";
import type { ICreateSprint } from "@/types/sprint";

export const useCreateSprint = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      organizationId,
      projectId,
      data,
    }: {
      organizationId: string;
      projectId: string;
      data: ICreateSprint;
    }) =>
      sprintService.createSprint(
        organizationId,
        projectId,
        data,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECTS.DETAIL(
          variables.projectId,
        ),
      });
    },
  });
};