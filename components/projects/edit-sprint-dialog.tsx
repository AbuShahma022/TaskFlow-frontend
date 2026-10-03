"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateSprint } from "@/hooks/mutations/use-update-sprint";
import { useOrganization } from "@/providers/organization-provider";
import type { ISprint } from "@/types/sprint";

interface EditSprintDialogProps {
  sprint: ISprint;
  projectId: string;
}

export function EditSprintDialog({
  sprint,
  projectId,
}: EditSprintDialogProps) {
  const { selectedOrganizationId } = useOrganization();
  const updateSprint = useUpdateSprint();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState(sprint.name);
  const [goal, setGoal] = useState(sprint.goal ?? "");
  const [startDate, setStartDate] = useState(
    sprint.startDate.slice(0, 10),
  );
  const [endDate, setEndDate] = useState(
    sprint.endDate.slice(0, 10),
  );

  useEffect(() => {
    if (open) {
      setName(sprint.name);
      setGoal(sprint.goal ?? "");
      setStartDate(sprint.startDate.slice(0, 10));
      setEndDate(sprint.endDate.slice(0, 10));
    }
  }, [open, sprint]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedOrganizationId) return;

    updateSprint.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId,
        sprintId: sprint.id,
        data: {
          name,
          goal,
          startDate: new Date(startDate).toISOString(),
          endDate: new Date(endDate).toISOString(),
        },
      },
      {
        onSuccess: () => {
          toast.success("Sprint updated successfully.");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update sprint.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Pencil className="mr-1 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Sprint</DialogTitle>
          <DialogDescription>
            Update your sprint information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Sprint name
            </label>

            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Goal
            </label>

            <Textarea
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Start date
              </label>

              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                End date
              </label>

              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateSprint.isPending}
            >
              {updateSprint.isPending
                ? "Saving..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}