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

import { useCreateOrganization } from "@/hooks/mutations/use-create-organization";

export default function CreateOrganizationDialog() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const createOrganizationMutation = useCreateOrganization();

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    const data = {
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim() || undefined,
    };

    createOrganizationMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Organization created successfully");

        setName("");
        setSlug("");
        setDescription("");
        setOpen(false);
      },

      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to create organization",
        );
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          + Create Organization
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            Create Organization
          </DialogTitle>

          <DialogDescription>
            Create a new organization and become its manager.
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
                Slug
              </label>

              <input
                type="text"
                value={slug}
                onChange={(e) =>
                  setSlug(e.target.value)
                }
                placeholder="organization-slug"
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
              disabled={createOrganizationMutation.isPending}
              className="rounded-md border px-4 py-2 text-sm font-medium"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={
                createOrganizationMutation.isPending ||
                !name.trim() ||
                !slug.trim()
              }
              className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createOrganizationMutation.isPending
                ? "Creating..."
                : "Create Organization"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}