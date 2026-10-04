"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { toast } from "sonner";

import { useProjectMembers } from "@/hooks/queries/use-project-members";
import { useAssignTask } from "@/hooks/mutations/use-assign-task";

import type { ITask } from "@/types/task";

interface AssignTaskDialogProps {
  organizationId: string;
  projectId: string;
  task: ITask;
}

export default function AssignTaskDialog({
  organizationId,
  projectId,
  task,
}: AssignTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [assignedToId, setAssignedToId] = useState(
    task.assignedToId ?? "",
  );

  const assignTaskMutation = useAssignTask();

  const {
    data: membersResponse,
    isLoading: membersLoading,
  } = useProjectMembers(
    organizationId,
    projectId,
    {
      page: 1,
      limit: 100,
    },
  );

  const members = membersResponse?.data?.data ?? [];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!assignedToId) {
      toast.error("Please select a project member");
      return;
    }

    assignTaskMutation.mutate(
      {
        organizationId,
        projectId,
        taskId: task.id,
        assignedToId,
      },
      {
        onSuccess: () => {
          toast.success("Task assigned successfully");
          setOpen(false);
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to assign task",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-md border px-3 py-1.5 text-xs font-medium"
        >
          Assign
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>

          <DialogDescription>
            Assign this task to a project member.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Project Member
            </label>

            <select
              value={assignedToId}
              onChange={(e) => setAssignedToId(e.target.value)}
              disabled={
                membersLoading ||
                assignTaskMutation.isPending
              }
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="">
                {membersLoading
                  ? "Loading members..."
                  : "Select a member"}
              </option>

              {members.map((member) => (
                <option
                  key={member.userId}
                  value={member.userId}
                >
                  {member.user.name} ({member.user.email})
                </option>
              ))}
            </select>
          </div>

          <DialogFooter className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                assignTaskMutation.isPending ||
                !assignedToId
              }
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
            >
              {assignTaskMutation.isPending
                ? "Assigning..."
                : "Assign Task"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}