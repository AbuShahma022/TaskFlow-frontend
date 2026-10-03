"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

import { useRemoveProjectMember } from "@/hooks/mutations/use-remove-project-member";
import type { IProjectMember } from "@/types/project";

interface RemoveProjectMemberDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: IProjectMember | null;
  organizationId: string;
  projectId: string;
}

export function RemoveProjectMemberDialog({
  open,
  onOpenChange,
  member,
  organizationId,
  projectId,
}: RemoveProjectMemberDialogProps) {
  const removeMemberMutation = useRemoveProjectMember();

  const handleRemove = () => {
    if (!member) return;

    removeMemberMutation.mutate(
      {
        organizationId,
        projectId,
        memberId: member.id,
      },
      {
        onSuccess: () => {
          toast.success(
            "Project member removed successfully.",
          );

          onOpenChange(false);
        },

        onError: () => {
          toast.error(
            "Failed to remove project member.",
          );
        },
      },
    );
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Remove project member?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to remove{" "}
            <span className="font-medium text-foreground">
              {member?.user.name}
            </span>{" "}
            from this project?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={removeMemberMutation.isPending}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={removeMemberMutation.isPending}
            onClick={handleRemove}
          >
            {removeMemberMutation.isPending
              ? "Removing..."
              : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}