"use client";

import { useOrganization } from "@/providers/organization-provider";
import { useActiveOrganization } from "@/hooks/mutations/use-active-organization";
import { useOrganizationInvitations } from "@/hooks/queries/use-organization-invitations";
import { useMyOrganizationInvitations } from "@/hooks/queries/use-my-organization-invitations";
import { useUpdateOrganizationInvitation } from "@/hooks/mutations/use-update-organization-invitation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function InvitationsPage() {
  const { selectedMembership } = useOrganization();
  const { organizationId } = useActiveOrganization();
  const { mutate: updateInvitation, isPending } =
  useUpdateOrganizationInvitation();

  const isManager =
    selectedMembership?.role === "MANAGER";

  const {
    data: organizationInvitationsData,
    isLoading: organizationInvitationsLoading,
    isError: organizationInvitationsError,
  } = useOrganizationInvitations(
    isManager ? organizationId ?? undefined : undefined,
    {
      page: 1,
      limit: 10,
    },
  );

  const {
    data: myInvitationsData,
    isLoading: myInvitationsLoading,
    isError: myInvitationsError,
  } = useMyOrganizationInvitations({
    page: 1,
    limit: 10,
  });

  const organizationInvitations =
    organizationInvitationsData?.data ?? [];

  const myInvitations =
    myInvitationsData?.data ?? [];

    const handleAccept = (invitationId: string) => {
  updateInvitation(
    {
      invitationId,
      payload: {
        status: "ACCEPTED",
      },
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to accept invitation");
      },
    }
  );
};

const handleReject = (invitationId: string) => {
  updateInvitation(
    {
      invitationId,
      payload: {
        status: "REJECTED",
      },
    },
    {
      onSuccess: (data) => {
        toast.success(data.message);
      },
      onError: (error) => {
        toast.error(error.message || "Failed to reject invitation");
      },
    }
  );
};

  return (
    <div className="w-full min-w-0 space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">Invitations</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Manage your organization invitations.
        </p>
      </div>

      {isManager && (
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Organization Invitations</h2>

            <p className="text-sm text-muted-foreground">
              Invitations sent from your organization.
            </p>
          </div>

          {organizationInvitationsLoading && (
            <div className="rounded-lg border p-5 text-sm">
              Loading organization invitations...
            </div>
          )}

          {organizationInvitationsError && (
            <div className="rounded-lg border p-5 text-sm text-destructive">
              Failed to load organization invitations.
            </div>
          )}

          {!organizationInvitationsLoading &&
            !organizationInvitationsError &&
            organizationInvitations.length === 0 && (
              <div className="rounded-lg border p-5 text-sm text-muted-foreground">
                No organization invitations found.
              </div>
            )}

          {!organizationInvitationsLoading &&
            !organizationInvitationsError &&
            organizationInvitations.length > 0 && (
              <div className="space-y-3">
                {organizationInvitations.map((invitation) => (
                  <div key={invitation.id} className="rounded-lg border p-4">
                    <p className="font-medium">{invitation.invitedUser.name}</p>

                    <p className="text-sm text-muted-foreground">
                      {invitation.invitedUser.email}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Status:
                      </span>

                      <Badge
                        variant={
                          invitation.status === "ACCEPTED"
                            ? "default"
                            : invitation.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {invitation.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Sent on{" "}
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
        </section>
      )}

      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">My Invitations</h2>

          <p className="text-sm text-muted-foreground">
            Invitations you have received.
          </p>
        </div>

        {myInvitationsLoading && (
          <div className="rounded-lg border p-5 text-sm">
            Loading your invitations...
          </div>
        )}

        {myInvitationsError && (
          <div className="rounded-lg border p-5 text-sm text-destructive">
            Failed to load your invitations.
          </div>
        )}

        {!myInvitationsLoading &&
          !myInvitationsError &&
          myInvitations.length === 0 && (
            <div className="rounded-lg border p-5 text-sm text-muted-foreground">
              No invitations found.
            </div>
          )}

        {!myInvitationsLoading &&
          !myInvitationsError &&
          myInvitations.length > 0 && (
            <div className="space-y-3">
              {myInvitations.map((invitation) => (
                <div key={invitation.id} className="rounded-lg border p-4">
                  <p className="font-medium">{invitation.organization.name}</p>

                  <p className="text-sm text-muted-foreground">
                    Invited by {invitation.invitedBy.name}
                  </p>

                  <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        Status:
                      </span>

                      <Badge
                        variant={
                          invitation.status === "ACCEPTED"
                            ? "default"
                            : invitation.status === "REJECTED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {invitation.status}
                      </Badge>
                    </div>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Received on{" "}
                      {new Date(invitation.createdAt).toLocaleDateString()}
                    </p>

                    {invitation.status === "PENDING" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAccept(invitation.id)}
                          disabled={isPending}
                        >
                          Accept
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(invitation.id)}
                          disabled={isPending}
                        >
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
      </section>
    </div>
  )
}