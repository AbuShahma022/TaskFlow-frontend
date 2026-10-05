"use client";

import { useParams } from "next/navigation";

import { useOrganizationMembers } from "@/hooks/queries/use-organization-members";
import { useOrganization } from "@/providers/organization-provider";
import InviteOrganizationMemberDialog from "@/components/organizations/invite-organization-member-dialog";

export default function OrganizationMembersPage() {
  const params = useParams();
  const { selectedMembership } = useOrganization();

  const organizationId = params.organizationId as string;
  const isManager =
  selectedMembership?.organization.id === organizationId &&
  selectedMembership.role === "MANAGER";

  const {
    data,
    isLoading,
    isError,
  } = useOrganizationMembers(organizationId, {
    page: 1,
    limit: 10,
  });

  const members = data?.data?.data ?? [];

  if (isLoading) {
    return (
      <div className="w-full p-4 sm:p-6">
        Loading members...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full p-4 sm:p-6 text-destructive">
        Failed to load organization members.
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold sm:text-2xl">
            Organization Members
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Manage members of your organization.
          </p>
        </div>

        {isManager && (
          <InviteOrganizationMemberDialog organizationId={organizationId} />
        )}
      </div>

      {members.length === 0 ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="text-sm text-muted-foreground">No members found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div key={member.id} className="rounded-lg border p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className="font-medium">{member.user.name}</p>

                  <p className="text-sm wrap-break-word text-muted-foreground">
                    {member.user.email}
                  </p>
                </div>

                <span className="w-fit rounded-md border px-2 py-1 text-xs font-medium">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}