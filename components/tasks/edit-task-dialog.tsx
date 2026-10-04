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

import type { ITask } from "@/types/task";
import { useUpdateTask } from "@/hooks/mutations/use-update-task";
import { toast } from "sonner";
import type { IUpdateTask, TaskPriority } from "@/types/task";

interface EditTaskDialogProps {
  organizationId: string;
  projectId: string;
  task: ITask;
}
export default function EditTaskDialog({
    organizationId,
  projectId,
  task,
}: EditTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const updateTaskMutation = useUpdateTask();

const [title, setTitle] = useState(task.title);
const [description, setDescription] = useState(
  task.description ?? "",
);
const [priority, setPriority] =
  useState<TaskPriority>(task.priority);
const [dueDate, setDueDate] = useState(
  task.dueDate ? task.dueDate.slice(0, 10) : "",
);

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const data: IUpdateTask = {
    title: title.trim(),
    description: description.trim() || undefined,
    priority,
    dueDate: dueDate
      ? new Date(`${dueDate}T00:00:00`).toISOString()
      : null,
  };

  updateTaskMutation.mutate(
    {
      organizationId,
      projectId,
      sprintId: task.sprintId,
      taskId: task.id,
      data,
    },
    {
      onSuccess: () => {
        toast.success("Task updated successfully");
        setOpen(false);
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to update task",
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
          Edit
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Task</DialogTitle>

          <DialogDescription>Update the task details.</DialogDescription>
        </DialogHeader>
         <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm"
            />
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as TaskPriority)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
            />
          </div>
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
            disabled={updateTaskMutation.isPending || !title.trim()}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {updateTaskMutation.isPending ? "Updating..." : "Update Task"}
          </button>
        </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}