"use client";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useCompleteSprint } from "@/hooks/mutations/use-complete-sprint";
import { useOrganization } from "@/providers/organization-provider";
import type { ISprint } from "@/types/sprint";

interface CompleteSprintDialogProps {
  sprint: ISprint;
  projectId: string;
}

export function CompleteSprintDialog({
  sprint,
  projectId,
}: CompleteSprintDialogProps) {
  const { selectedOrganizationId } = useOrganization();
  const completeSprint = useCompleteSprint();

  const handleComplete = () => {
    if (!selectedOrganizationId) {
      toast.error("Organization not selected.");
      return;
    }

    completeSprint.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId,
        sprintId: sprint.id,
      },
      {
        onSuccess: () => {
          toast.success("Sprint completed successfully.");
        },
        onError: () => {
          toast.error("Failed to complete sprint.");
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Check className="mr-1 size-4" />
          Complete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Complete this sprint?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to complete{" "}
            <strong>{sprint.name}</strong>? This action will
            mark the sprint as completed.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleComplete}
            disabled={completeSprint.isPending}
          >
            {completeSprint.isPending
              ? "Completing..."
              : "Complete Sprint"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}