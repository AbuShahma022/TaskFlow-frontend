"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useOrganization } from "@/providers/organization-provider";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { useActivityLogs } from "@/hooks/queries/use-activity-logs";

export default function ActivityLogsPage() {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const { selectedMembership } = useOrganization();
  const { organizationId } = useActiveOrganization();

  useEffect(() => {
    if (
      selectedMembership &&
      selectedMembership.role !== "MANAGER"
    ) {
      router.replace("/dashboard");
    }
  }, [selectedMembership, router]);

  const { data, isLoading, isError } = useActivityLogs(
    organizationId ?? undefined,
    {
      page,
      limit: 10,
    },
  );

  const logs = data?.data?.data ?? [];
  const pagination = data?.data?.pagination;

  // No organization selected
  if (!organizationId) {
    return (
      <div className="w-full min-w-0 p-4 sm:p-6">
        <div className="rounded-lg border p-5 sm:p-6">
          <p className="text-sm text-muted-foreground">
            Please select an organization.
          </p>
        </div>
      </div>
    );
  }

  // Prevent showing the page while redirecting a member
  if (
    selectedMembership &&
    selectedMembership.role !== "MANAGER"
  ) {
    return null;
  }

  return (
    <div className="w-full min-w-0 space-y-5 p-4 sm:space-y-6 sm:p-6">
      {/* Header */}
      <div className="min-w-0">
        <h1 className="text-xl font-semibold sm:text-2xl">
          Activity Logs
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Track important activities in your organization.
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="rounded-lg border p-5 text-sm sm:p-6">
          Loading activity logs...
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg border p-5 text-sm text-destructive sm:p-6">
          Failed to load activity logs.
        </div>
      )}

      {/* Empty */}
      {!isLoading && !isError && logs.length === 0 && (
        <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">
          No activity logs found.
        </div>
      )}

      {/* Activity list */}
      {!isLoading && !isError && logs.length > 0 && (
        <div className="w-full min-w-0 space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="w-full min-w-0 overflow-hidden rounded-lg border p-4 sm:p-5"
            >
              {/* Top section */}
              <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                {/* Description + user */}
                <div className="min-w-0 flex-1 space-y-1.5">
                  <p className="wrap-break-word text-sm font-medium leading-5">
                    {log.description}
                  </p>

                  <p className="wrap-break-word text-xs text-muted-foreground">
                    By{" "}
                    <span className="font-medium text-foreground">
                      {log.user.name}
                    </span>{" "}
                    ({log.user.email})
                  </p>
                </div>

                {/* Action */}
                <span className="w-fit max-w-full shrink-0 wrap-break-word rounded-md border px-2 py-1 text-xs font-medium">
                  {log.action}
                </span>
              </div>

              {/* Metadata */}
              <div className="mt-4 flex min-w-0 flex-col gap-1.5 border-t pt-3 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-1.5">
                <span className="wrap-break-word">
                  Entity:{" "}
                  <span className="font-medium text-foreground">
                    {log.entityType}
                  </span>
                </span>

                <span className="wrap-break-word">
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Page {pagination.page} of{" "}
            {pagination.totalPages}
          </p>

          <div className="flex w-full gap-2 sm:w-auto">
            <button
              type="button"
              disabled={page === 1}
              onClick={() =>
                setPage((prev) => prev - 1)
              }
              className="flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50 sm:flex-none"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={
                page === pagination.totalPages
              }
              onClick={() =>
                setPage((prev) => prev + 1)
              }
              className="flex-1 rounded-md border px-3 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-50 sm:flex-none"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}