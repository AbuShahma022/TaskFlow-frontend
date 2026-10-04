"use client";

import { useTasks } from "@/hooks/queries/useTasks";
import CreateTaskDialog from "@/components/tasks/create-task-dialog";
import EditTaskDialog from "@/components/tasks/edit-task-dialog";
import { useUpdateTaskStatus } from "@/hooks/mutations/use-update-task-status";
import type { TaskStatus } from "@/types/task";
import AssignTaskDialog from "@/components/tasks/assign-task-dialog";
import { toast } from "sonner";
interface SprintTasksSectionProps {
  organizationId: string;
  projectId: string;
  sprint: {
    id: string;
    name: string;
    goal?: string | null;
    startDate: string;
    endDate: string;
    status: string;
  };
  isManager: boolean;
}

export default function SprintTasksSection({
  organizationId,
  projectId,
  sprint,
  isManager,
}: SprintTasksSectionProps) {
    const updateTaskStatusMutation = useUpdateTaskStatus();
  const {
    data: taskResponse,
    isLoading: tasksLoading,
  } = useTasks(
    organizationId,
    projectId,
    {
      page: 1,
      limit: 50,
      sprintId: sprint.id,
    },
  );

  const tasks = taskResponse?.data?.data ?? [];

  return (
    <section className="overflow-hidden rounded-lg border">
      {/* Sprint header */}
      <div className="border-b p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold">{sprint.name}</h2>

              <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                {sprint.status}
              </span>
            </div>

            {sprint.goal && (
              <p className="mt-1 text-sm text-muted-foreground">
                {sprint.goal}
              </p>
            )}

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <span>
                Start: {new Date(sprint.startDate).toLocaleDateString()}
              </span>

              <span>End: {new Date(sprint.endDate).toLocaleDateString()}</span>
            </div>
          </div>
          <CreateTaskDialog
            organizationId={organizationId}
            projectId={projectId}
            sprintId={sprint.id}
            sprintName={sprint.name}
          />
        </div>
      </div>

      {/* Tasks */}
      <div>
        <div className="border-b px-5 py-3">
          <h3 className="text-sm font-medium">Tasks ({tasks.length})</h3>
        </div>

        {tasksLoading ? (
          <div className="p-6 text-sm text-muted-foreground">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-sm font-medium">No tasks in this sprint</p>

            {isManager && (
              <p className="mt-1 text-xs text-muted-foreground">
                Create a task to get started.
              </p>
            )}
          </div>
        ) : (
          <div>
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex flex-col gap-4 border-b p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <h4 className="font-medium">{task.title}</h4>

                  {task.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {task.description}
                    </p>
                  )}

                  <div className="text-xs text-muted-foreground">
                    Assigned to:{" "}
                    <span className="font-medium text-foreground">
                      {task.assignedTo?.name ?? "Unassigned"}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    {task.priority}
                  </span>

                  <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                    {task.status}
                  </span>

                  {isManager && (
                    <select
                      value={task.status}
                      disabled={updateTaskStatusMutation.isPending}
                      onChange={(e) => {
                        const status = e.target.value as TaskStatus

                        updateTaskStatusMutation.mutate(
                          {
                            organizationId,
                            projectId,
                            taskId: task.id,
                            status,
                          },
                          {
                            onSuccess: () => {
                              toast.success("Task status updated successfully")
                            },
                            onError: (error) => {
                              toast.error(
                                error instanceof Error
                                  ? error.message
                                  : "Failed to update task status"
                              )
                            },
                          }
                        )
                      }}
                      className="h-8 rounded-md border bg-background px-2 text-xs"
                    >
                      <option value="TODO">To Do</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="IN_REVIEW">In Review</option>
                      <option value="DONE">Done</option>
                    </select>
                  )}

                  {isManager && (
                    <>
                      <AssignTaskDialog
                        organizationId={organizationId}
                        projectId={projectId}
                        task={task}
                      />

                      <EditTaskDialog
                        organizationId={organizationId}
                        projectId={projectId}
                        task={task}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}