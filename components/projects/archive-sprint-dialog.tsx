"use client";

import { Archive } from "lucide-react";
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

import { useArchiveSprint } from "@/hooks/mutations/use-archive-sprint";
import { useOrganization } from "@/providers/organization-provider";
import type { ISprint } from "@/types/sprint";

interface ArchiveSprintDialogProps {
  sprint: ISprint;
  projectId: string;
}

export function ArchiveSprintDialog({
  sprint,
  projectId,
}: ArchiveSprintDialogProps) {
  const { selectedOrganizationId } = useOrganization();
  const archiveSprint = useArchiveSprint();

  const handleArchive = () => {
    if (!selectedOrganizationId) return;

    archiveSprint.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId,
        sprintId: sprint.id,
      },
      {
        onSuccess: () => {
          toast.success("Sprint archived successfully.");
        },
        onError: () => {
          toast.error("Failed to archive sprint.");
        },
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={sprint.status === "ARCHIVED"}
        >
          <Archive className="mr-1 size-4" />
          Archive
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Archive this sprint?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to archive{" "}
            <strong>{sprint.name}</strong>? You won't be
            able to use it as an active sprint.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleArchive}
            disabled={archiveSprint.isPending}
          >
            {archiveSprint.isPending
              ? "Archiving..."
              : "Archive Sprint"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}