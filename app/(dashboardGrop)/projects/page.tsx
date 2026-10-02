"use client";

import { useProjects } from "@/hooks/queries/use-projects";

export default function ProjectsPage() {
  const { data, isLoading, isError } = useProjects();
  console.log(data?.data);

  if (isLoading) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <p className="text-sm text-muted-foreground">
          Loading projects...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <p className="text-sm text-destructive">
          Failed to load projects.
        </p>
      </div>
    );
  }

  const projects = data?.data.data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Projects
        </h1>

        <p className="text-sm text-muted-foreground">
          Manage your organization projects.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((project) => (
          <div
            key={project.id}
            className="rounded-lg border p-4"
          >
            <h2 className="font-medium">
              {project.name}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
              <span>
                Status: {project.status}
              </span>

              <span>
                Tasks: {project._count.tasks}
              </span>

              <span>
                Members: {project._count.members}
              </span>

              <span>
                Sprints: {project._count.sprints}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}