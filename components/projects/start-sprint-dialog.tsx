"use client";

import { Play } from "lucide-react";
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

import { useStartSprint } from "@/hooks/mutations/use-start-sprint";
import { useOrganization } from "@/providers/organization-provider";
import type { ISprint } from "@/types/sprint";

interface StartSprintDialogProps {
  sprint: ISprint;
  projectId: string;
}

export function StartSprintDialog({
  sprint,
  projectId,
}: StartSprintDialogProps) {
  const { selectedOrganizationId } = useOrganization();
  const startSprint = useStartSprint();

  const handleStart = () => {
    if (!selectedOrganizationId) {
      toast.error("Organization not selected.");
      return;
    }

    startSprint.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId,
        sprintId: sprint.id,
      },
      {
        onSuccess: () => {
          toast.success("Sprint started successfully.");
        },
        onError: () => {
          toast.error("Failed to start sprint.");
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Play className="mr-1 size-4" />
          Start
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Start this sprint?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to start{" "}
            <strong>{sprint.name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleStart}
            disabled={startSprint.isPending}
          >
            {startSprint.isPending
              ? "Starting..."
              : "Start Sprint"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}