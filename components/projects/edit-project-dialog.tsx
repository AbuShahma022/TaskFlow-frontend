"use client";

import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useUpdateProject } from "@/hooks/mutations/use-update-project";
import { useOrganization } from "@/providers/organization-provider";
import {
 updateProjectSchema,
  type UpdateProjectFormValues,
} from "@/lib/validations/project";
import type { IEditableProject } from "@/types/project";

interface EditProjectDialogProps {
  project: IEditableProject;
}

export function EditProjectDialog({
  project,
}: EditProjectDialogProps) {
  const [open, setOpen] = useState(false);

  const { selectedOrganizationId } = useOrganization();
  const updateProjectMutation = useUpdateProject();

const form = useForm<UpdateProjectFormValues>({
  resolver: zodResolver(updateProjectSchema),
    defaultValues: {
      name: project.name,
      description: project.description,
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: project.name,
        description: project.description,
      });
    }
  }, [open, project, form]);

  const onSubmit = (data: UpdateProjectFormValues) => {
    if (!selectedOrganizationId) {
      toast.error("Please select an organization.");
      return;
    }

    updateProjectMutation.mutate(
      {
        organizationId: selectedOrganizationId,
        projectId: project.id,
        data,
      },
      {
        onSuccess: () => {
          toast.success("Project updated successfully.");
          setOpen(false);
        },

        onError: () => {
          toast.error("Failed to update project.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="shrink-0">
          <Pencil />
          <span className="hidden sm:inline">Edit Project</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] w-[calc(100%-2rem)] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>

          <DialogDescription>
            Update your project information.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-name">Project name</FieldLabel>

              <Input
                id="project-name"
                {...form.register("name")}
                aria-invalid={!!form.formState.errors.name}
              />

              {form.formState.errors.name && (
                <FieldError errors={[form.formState.errors.name]} />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="project-description">Description</FieldLabel>

              <Textarea
                id="project-description"
                rows={4}
                {...form.register("description")}
                aria-invalid={!!form.formState.errors.description}
              />

              {form.formState.errors.description && (
                <FieldError errors={[form.formState.errors.description]} />
              )}
            </Field>
          </FieldGroup>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={updateProjectMutation.isPending}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateProjectMutation.isPending}
              className="w-full sm:w-auto"
            >
              {updateProjectMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}