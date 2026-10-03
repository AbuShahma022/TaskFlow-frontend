"use client";

import { useEffect, useMemo, useState } from "react";
import { UserPlus, Search } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { useOrganization } from "@/providers/organization-provider";
import { useOrganizationMembers } from "@/hooks/queries/use-organization-members";
import { useAddProjectMember } from "@/hooks/mutations/use-add-project-member";

import type { IProjectDetails } from "@/types/project";
import { useDebounce } from "@/hooks/use-debounce";

interface AddMemberDialogProps {
  project: IProjectDetails;
}

export function AddMemberDialog({
  project,
}: AddMemberDialogProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string | null>(
    null,
  );
  const debouncedSearch = useDebounce(search, 400);

  const { selectedOrganizationId } = useOrganization();

  const { data, isLoading, isError } = useOrganizationMembers(
    selectedOrganizationId ?? undefined,
    {
      page: 1,
      limit: 50,
      search: debouncedSearch || undefined,
    },
  );

  const addMemberMutation = useAddProjectMember();

  const organizationMembers = data?.data.data ?? [];

  const availableMembers = useMemo(() => {
    const projectMemberIds = new Set(
      project.members.map((member) => member.userId),
    );

    return organizationMembers.filter(
      (member) => !projectMemberIds.has(member.userId),
    );
  }, [organizationMembers, project.members]);

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedUserId(null);
    }
  }, [open]);

  const handleAddMember = () => {
    if (!selectedOrganizationId) {
      toast.error("Please select an organization.");
      return;
    }

    if (!selectedUserId) {
      toast.error("Please select a member.");
      return;
    }

    addMemberMutation.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId: project.id,
        data: {
          userId: selectedUserId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Member added successfully.");
          setOpen(false);
        },

        onError: () => {
          toast.error("Failed to add member.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <UserPlus />
          <span>Add Member</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Project Member</DialogTitle>

          <DialogDescription>
            Select an organization member to add to this project.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search members..."
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setSelectedUserId(null);
              }}
              className="pl-9"
            />
          </div>

          {/* Members */}
          <div className="max-h-75 space-y-2 overflow-y-auto">
            {isLoading && (
              <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
                Loading members...
              </div>
            )}

            {isError && (
              <div className="rounded-md border border-destructive/30 p-6 text-center text-sm text-destructive">
                Failed to load organization members.
              </div>
            )}

            {!isLoading &&
              !isError &&
              availableMembers.length === 0 && (
                <div className="rounded-md border p-6 text-center text-sm text-muted-foreground">
                  No available members found.
                </div>
              )}

            {!isLoading &&
              !isError &&
              availableMembers.map((member) => {
                const isSelected =
                  selectedUserId === member.userId;

                return (
                  <button
                    key={member.id}
                    type="button"
                    onClick={() =>
                      setSelectedUserId(member.userId)
                    }
                    className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-muted text-sm font-medium">
                      {member.user.avatar ? (
                        <img
                          src={member.user.avatar}
                          alt={member.user.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        member.user.name
                          .charAt(0)
                          .toUpperCase()
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

                    {isSelected && (
                      <div className="size-2 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setOpen(false)}
              disabled={addMemberMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={handleAddMember}
              disabled={
                !selectedUserId ||
                addMemberMutation.isPending
              }
            >
              {addMemberMutation.isPending
                ? "Adding..."
                : "Add Member"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}