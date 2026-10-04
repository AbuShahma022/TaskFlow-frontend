"use client";

import { useState } from "react";

import { useProjects } from "@/hooks/queries/use-projects";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { useSprints } from "@/hooks/queries/use-sprints";
import { useOrganization } from "@/providers/organization-provider";
import SprintTasksSection from "@/components/tasks/sprint-tasks-section";

export default function TasksPage() {
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const { selectedMembership } = useOrganization();

  const { organizationId } = useActiveOrganization();

const {
  data: sprintResponse,
  isLoading: sprintsLoading,
} = useSprints(
   organizationId ?? undefined,
  selectedProjectId || undefined,
  {
    page: 1,
    limit: 50,
  },
);

const sprints = sprintResponse?.data?.data ?? [];
const isManager =
  selectedMembership?.role === "MANAGER";

  const {
    data: projectResponse,
    isLoading: projectsLoading,
  } = useProjects({
    page: 1,
    limit: 100,
  });

  const projects = projectResponse?.data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Tasks
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage tasks across your project sprints.
        </p>
      </div>

      <div className="max-w-md space-y-2">
        <label className="text-sm font-medium">
          Project
        </label>

        <select
          value={selectedProjectId}
          onChange={(e) =>
            setSelectedProjectId(e.target.value)
          }
          disabled={projectsLoading}
          className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="">
            {projectsLoading
              ? "Loading projects..."
              : "Select a project"}
          </option>

          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedProjectId && (
        <div className="rounded-lg border p-10 text-center">
          <p className="font-medium">
            Select a project
          </p>

          <p className="mt-1 text-sm text-muted-foreground">
            Choose a project to view its sprints and tasks.
          </p>
        </div>
      )}

      {selectedProjectId && (
  <>
    {sprintsLoading ? (
      <div className="rounded-lg border p-10 text-center">
        <p className="text-sm text-muted-foreground">
          Loading sprints...
        </p>
      </div>
    ) : sprints.length === 0 ? (
      <div className="rounded-lg border p-10 text-center">
        <p className="font-medium">
          No sprints found
        </p>

        <p className="mt-1 text-sm text-muted-foreground">
          This project does not have any sprints yet.
        </p>
      </div>
    ) : (
      <div className="space-y-6">
        {sprints.map((sprint) => (
          <SprintTasksSection
            key={sprint.id}
            organizationId={organizationId!}
            projectId={selectedProjectId}
            sprint={sprint}
            isManager={isManager}
          />
        ))}
      </div>
    )}
  </>
)}
    </div>
  );
}

