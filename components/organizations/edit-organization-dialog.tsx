"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useUpdateOrganization } from "@/hooks/mutations/use-update-organization";
import type {
  Organization,
  UpdateOrganizationPayload,
} from "@/types/organization";

interface EditOrganizationDialogProps {
  organization: Organization;
}

export default function EditOrganizationDialog({
  organization,
}: EditOrganizationDialogProps) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState(organization.name);
  const [description, setDescription] = useState(
    organization.description ?? "",
  );

  const updateOrganizationMutation =
    useUpdateOrganization();

  useEffect(() => {
    if (open) {
      setName(organization.name);
      setDescription(organization.description ?? "");
    }
  }, [open, organization]);

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const payload: UpdateOrganizationPayload = {
      name: name.trim(),
      description: description.trim() || undefined,
    };

    updateOrganizationMutation.mutate(
      {
        organizationId: organization.id,
        payload,
      },
      {
        onSuccess: () => {
          toast.success(
            "Organization updated successfully",
          );

          setOpen(false);
        },

        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update organization",
          );
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent"
      >
        Edit
      </button>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Edit Organization
          </DialogTitle>

          <DialogDescription>
            Update your organization information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter organization name"
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <textarea
                rows={4}
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                placeholder="Enter organization description"
                className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              disabled={
                updateOrganizationMutation.isPending
              }
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                updateOrganizationMutation.isPending ||
                !name.trim()
              }
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {updateOrganizationMutation.isPending
                ? "Updating..."
                : "Update Organization"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}