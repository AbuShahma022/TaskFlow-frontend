"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { useCreateProject } from "@/hooks/mutations/use-create-project";
import {
  createProjectSchema,
  type CreateProjectFormValues,
} from "@/lib/validations/project";
import { useOrganization } from "@/providers/organization-provider";

export function CreateProjectDialog() {
  const [open, setOpen] = useState(false);

  const { selectedOrganizationId } = useOrganization();
  const createProjectMutation = useCreateProject();

  const form = useForm<CreateProjectFormValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = (data: CreateProjectFormValues) => {
    if (!selectedOrganizationId) {
      toast.error("Please select an organization.");
      return;
    }

    createProjectMutation.mutate(
      {
        organizationId: selectedOrganizationId,
        data,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully.");

          form.reset();
          setOpen(false);
        },

        onError: () => {
          toast.error("Failed to create project.");
        },
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          Create Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>

          <DialogDescription>
            Create a new project for your organization.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="project-name">
                Project name
              </FieldLabel>

              <Input
                id="project-name"
                placeholder="e.g. TaskFlow"
                {...form.register("name")}
                aria-invalid={!!form.formState.errors.name}
              />

              {form.formState.errors.name && (
                <FieldError
                  errors={[
                    form.formState.errors.name,
                  ]}
                />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="project-description">
                Description
              </FieldLabel>

              <Textarea
                id="project-description"
                placeholder="Describe your project..."
                rows={4}
                {...form.register("description")}
                aria-invalid={
                  !!form.formState.errors.description
                }
              />

              {form.formState.errors.description && (
                <FieldError
                  errors={[
                    form.formState.errors.description,
                  ]}
                />
              )}
            </Field>
          </FieldGroup>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createProjectMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createProjectMutation.isPending}
            >
              {createProjectMutation.isPending
                ? "Creating..."
                : "Create Project"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}