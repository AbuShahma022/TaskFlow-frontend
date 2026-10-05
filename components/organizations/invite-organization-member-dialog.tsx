"use client";

import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useCreateOrganizationInvitation } from "@/hooks/mutations/use-create-organization-invitation";

interface InviteOrganizationMemberDialogProps {
  organizationId: string;
}

export default function InviteOrganizationMemberDialog({
  organizationId,
}: InviteOrganizationMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");

  const createInvitationMutation =
    useCreateOrganizationInvitation();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      return;
    }

    createInvitationMutation.mutate(
      {
        organizationId,
        payload: {
          email: trimmedEmail,
        },
      },
      {
        onSuccess: () => {
          toast.success(
            "Organization invitation sent successfully",
          );

          setEmail("");
          setOpen(false);
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to send invitation",
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
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          + Invite Member
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Invite Organization Member
          </DialogTitle>

          <DialogDescription>
            Enter the email address of a registered user you
            want to invite.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="member@example.com"
              required
              className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <DialogFooter className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={createInvitationMutation.isPending}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createInvitationMutation.isPending ||
                !email.trim()
              }
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createInvitationMutation.isPending
                ? "Sending..."
                : "Send Invitation"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}