"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useProject } from "@/hooks/queries/use-project";
import { useOrganization } from "@/providers/organization-provider";
import { AddMemberDialog } from "@/components/projects/add-member-dialog";
import { useDebounce } from "@/hooks/use-debounce";
import { useProjectMembers } from "@/hooks/queries/use-project-members";
import { Input } from "@/components/ui/input";
import type { IProjectMember } from "@/types/project";
import { RemoveProjectMemberDialog } from "@/components/projects/remove-project-member-dialog";
import { CreateSprintDialog } from "@/components/projects/create-sprint-dialog";
import { useSprints } from "@/hooks/queries/use-sprints";
import { EditSprintDialog } from "@/components/projects/edit-sprint-dialog";
import { ArchiveSprintDialog } from "@/components/projects/archive-sprint-dialog";
import { StartSprintDialog } from "@/components/projects/start-sprint-dialog";
import { CompleteSprintDialog } from "@/components/projects/complete-sprint-dialog";


export default function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const { selectedOrganizationId,selectedMembership } = useOrganization();
  const [memberToRemove, setMemberToRemove] =
  useState<IProjectMember | null>(null);

  const [memberSearch, setMemberSearch] = useState("");
const [memberPage, setMemberPage] = useState(1);

const debouncedMemberSearch = useDebounce(
  memberSearch,
  400,
);

const {
  data: membersData,
  isLoading: membersLoading,
  isError: membersError,
} = useProjectMembers(
  selectedOrganizationId ?? undefined,
  projectId,
  {
    page: memberPage,
    limit: 10,
    search: debouncedMemberSearch || undefined,
  },
);

const members = membersData?.data.data ?? [];
const memberPagination = membersData?.data.pagination;


  const {
    data,
    isLoading,
    isError,
  } = useProject(projectId);
 const project = data?.data;

const isManager = selectedMembership?.role === "MANAGER";


const {
  data: sprintsData,
  isLoading: sprintsLoading,
  isError: sprintsError,
} = useSprints(
  selectedOrganizationId ?? undefined,
  projectId,
  {
    page: 1,
    limit: 10,
  },
);

const sprints = sprintsData?.data.data ?? [];
const sprintPagination = sprintsData?.data.pagination;



  if (isLoading) {
    return (
      <div className="flex min-h-75 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading project...
        </p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="space-y-4">
        <Button asChild variant="ghost">
          <Link href="/projects">
            <ArrowLeft />
            Back to projects
          </Link>
        </Button>

        <div className="rounded-lg border p-8 text-center">
          <h2 className="font-medium">
            Project not found
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Unable to load this project.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost">
        <Link href="/projects">
          <ArrowLeft />
          Back to projects
        </Link>
      </Button>

      {/* Project header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold tracking-tight">
              {project.name}
            </h1>

            <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
              {project.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {project.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm text-muted-foreground">Members</p>

          <p className="mt-2 text-2xl font-semibold">
            {project._count.members}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm text-muted-foreground">Tasks</p>

          <p className="mt-2 text-2xl font-semibold">{project._count.tasks}</p>
        </div>

        <div className="rounded-lg border bg-card p-5">
          <p className="text-sm text-muted-foreground">Sprints</p>

          <p className="mt-2 text-2xl font-semibold">
            {project._count.sprints}
          </p>
        </div>
      </div>

      {/* Members */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Members</h2>

            <p className="text-sm text-muted-foreground">
              People working on this project.
            </p>
          </div>

          {isManager && <AddMemberDialog project={project} />}
        </div>

        <Input
          placeholder="Search project members..."
          value={memberSearch}
          onChange={(event) => {
            setMemberSearch(event.target.value)
            setMemberPage(1)
          }}
          className="w-full sm:max-w-sm"
        />

        {membersLoading && (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            Loading members...
          </div>
        )}

        {membersError && (
          <div className="rounded-lg border border-destructive/30 p-6 text-center text-sm text-destructive">
            Failed to load members.
          </div>
        )}

        {!membersLoading && !membersError && members.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            No members found.
          </div>
        )}

        {!membersLoading && !membersError && members.length > 0 && (
          <div className="rounded-lg border">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-3 border-b p-4 last:border-b-0"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium">
                  {member.user.avatar ? (
                    <img
                      src={member.user.avatar}
                      alt={member.user.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    member.user.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {member.user.name}
                  </p>

                  <p className="truncate text-xs text-muted-foreground">
                    {member.user.email}
                  </p>
                </div>

                {isManager && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setMemberToRemove(member)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}

        <RemoveProjectMemberDialog
          open={!!memberToRemove}
          onOpenChange={(open) => {
            if (!open) {
              setMemberToRemove(null)
            }
          }}
          member={memberToRemove}
          organizationId={selectedOrganizationId ?? ""}
          projectId={projectId}
        />
      </section>
      {/* Sprints */}
      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold">Sprints</h2>

            <p className="text-sm text-muted-foreground">
              Sprints belonging to this project.
            </p>
          </div>

          {isManager && <CreateSprintDialog projectId={projectId} />}
        </div>

        {sprintsLoading && (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            Loading sprints...
          </div>
        )}

        {sprintsError && (
          <div className="rounded-lg border border-destructive/30 p-6 text-center text-sm text-destructive">
            Failed to load sprints.
          </div>
        )}

        {!sprintsLoading && !sprintsError && sprints.length === 0 && (
          <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
            No sprints yet.
          </div>
        )}

        {!sprintsLoading && !sprintsError && sprints.length > 0 && (
          <div className="rounded-lg border">
            {sprints.map((sprint) => (
              <div
                key={sprint.id}
                className="flex flex-col gap-4 border-b p-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-medium">{sprint.name}</h3>

                    <span className="rounded-full bg-muted px-2.5 py-1 text-xs">
                      {sprint.status}
                    </span>
                  </div>

                  {sprint.goal && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {sprint.goal}
                    </p>
                  )}

                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>
                      Start: {new Date(sprint.startDate).toLocaleDateString()}
                    </span>

                    <span>
                      End: {new Date(sprint.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {isManager && (
                  <div className="flex flex-wrap gap-2">
                    {sprint.status === "PLANNED" && (
                      <StartSprintDialog
                        projectId={projectId}
                        sprint={sprint}
                      />
                    )}

                    {sprint.status === "ACTIVE" && (
                      <CompleteSprintDialog
                        projectId={projectId}
                        sprint={sprint}
                      />
                    )}

                    {sprint.status !== "ARCHIVED" && (
                      <>
                        <EditSprintDialog
                          projectId={projectId}
                          sprint={sprint}
                        />

                        <ArchiveSprintDialog
                          projectId={projectId}
                          sprint={sprint}
                        />
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}