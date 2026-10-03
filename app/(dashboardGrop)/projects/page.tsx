"use client"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import { Input } from "@/components/ui/input"

import { useProjects } from "@/hooks/queries/use-projects"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import { useOrganization } from "@/providers/organization-provider"


export default function ProjectsPage() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState<"ACTIVE" | "ARCHIVED" | undefined>()
  const debouncedSearch = useDebounce(search, 400)
    const { selectedMembership } = useOrganization();

  const [page, setPage] = useState(1)
  const { data, isLoading, isError } = useProjects({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    status,
  })

  const projects = data?.data.data ?? []
  const pagination = data?.data.pagination


const canCreateProject = selectedMembership?.role === "MANAGER";
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Projects</h1>

          <p className="text-sm text-muted-foreground">
            Manage your organization projects.
          </p>
        </div>

        {canCreateProject && (
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Project
          </button>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          placeholder="Search projects..."
          value={search}
          onChange={(event) => {
            setSearch(event.target.value)
          }}
          className="sm:max-w-sm"
        />

        <Select
          value={status ?? "ALL"}
          onValueChange={(value) => {
            setStatus(
              value === "ALL" ? undefined : (value as "ACTIVE" | "ARCHIVED")
            )
          }}
        >
          <SelectTrigger className="sm:w-45">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>

            <SelectItem value="ACTIVE">Active</SelectItem>

            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border p-8 text-center text-sm text-muted-foreground">
          Loading projects...
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 p-8 text-center text-sm text-destructive">
          Failed to load projects.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && projects.length === 0 && (
        <div className="rounded-lg border p-8 text-center">
          <h2 className="font-medium">No projects found</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Create your first project to get started.
          </p>
        </div>
      )}

      {/* Projects */}
      {!isLoading && !isError && projects.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border bg-card p-5 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="truncate font-semibold">{project.name}</h2>

                  <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {project.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t pt-4">
                <div>
                  <p className="text-xs text-muted-foreground">Members</p>
                  <p className="mt-1 font-medium">{project._count.members}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Tasks</p>
                  <p className="mt-1 font-medium">{project._count.tasks}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Sprints</p>
                  <p className="mt-1 font-medium">{project._count.sprints}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next "
          onPageChange={(selectedItem) => {
            setPage(selectedItem.selected + 1)
          }}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          pageCount={pagination.totalPages}
          previousLabel=" Previous"
          forcePage={pagination.page - 1}
          containerClassName="flex items-center justify-center gap-2 pt-6"
          pageClassName="flex h-9 min-w-9 items-center justify-center rounded-md border text-sm cursor-pointer"
          pageLinkClassName="flex h-full w-full items-center justify-center px-3"
          activeClassName="bg-primary text-primary-foreground"
          previousClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm"
          nextClassName="flex h-9 items-center cursor-pointer justify-center rounded-md border px-3 text-sm"
          disabledClassName="pointer-events-none opacity-50"
        />
      )}
    </div>
  )
}
