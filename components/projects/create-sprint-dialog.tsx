"use client";

import { useState } from "react";
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

import { useCreateSprint } from "@/hooks/mutations/use-create-sprint";
import { useOrganization } from "@/providers/organization-provider";
import {
  createSprintSchema,
  type CreateSprintFormValues,
} from "@/lib/validations/sprint";

interface CreateSprintDialogProps {
  projectId: string;
}

export function CreateSprintDialog({
  projectId,
}: CreateSprintDialogProps) {
  const [open, setOpen] = useState(false);

  const { selectedOrganizationId } = useOrganization();
  const createSprintMutation = useCreateSprint();

  const form = useForm<CreateSprintFormValues>({
    resolver: zodResolver(createSprintSchema),
    defaultValues: {
      name: "",
      goal: "",
      startDate: "",
      endDate: "",
    },
  });

const onSubmit = (data: CreateSprintFormValues) => {
  if (!selectedOrganizationId) {
    toast.error("Please select an organization.");
    return;
  }

  createSprintMutation.mutate({
    organizationId: selectedOrganizationId,
    projectId,
    data: {
      ...data,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
    },
  });
};

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Sprint</Button>
      </DialogTrigger>

      <DialogContent className="w-[calc(100%-2rem)] sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create Sprint</DialogTitle>

          <DialogDescription>
            Create a new sprint for this project.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="sprint-name">
                Sprint name
              </FieldLabel>

              <Input
                id="sprint-name"
                placeholder="Sprint 1"
                {...form.register("name")}
                aria-invalid={!!form.formState.errors.name}
              />

              {form.formState.errors.name && (
                <FieldError
                  errors={[form.formState.errors.name]}
                />
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="sprint-goal">
                Goal
              </FieldLabel>

              <Textarea
                id="sprint-goal"
                placeholder="Complete the authentication module"
                rows={3}
                {...form.register("goal")}
                aria-invalid={!!form.formState.errors.goal}
              />

              {form.formState.errors.goal && (
                <FieldError
                  errors={[form.formState.errors.goal]}
                />
              )}
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field>
                <FieldLabel htmlFor="sprint-start-date">
                  Start date
                </FieldLabel>

                <Input
                  id="sprint-start-date"
                  type="date"
                  {...form.register("startDate")}
                  aria-invalid={
                    !!form.formState.errors.startDate
                  }
                />

                {form.formState.errors.startDate && (
                  <FieldError
                    errors={[
                      form.formState.errors.startDate,
                    ]}
                  />
                )}
              </Field>

              <Field>
                <FieldLabel htmlFor="sprint-end-date">
                  End date
                </FieldLabel>

                <Input
                  id="sprint-end-date"
                  type="date"
                  {...form.register("endDate")}
                  aria-invalid={
                    !!form.formState.errors.endDate
                  }
                />

                {form.formState.errors.endDate && (
                  <FieldError
                    errors={[
                      form.formState.errors.endDate,
                    ]}
                  />
                )}
              </Field>
            </div>
          </FieldGroup>

          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={createSprintMutation.isPending}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={createSprintMutation.isPending}
            >
              {createSprintMutation.isPending
                ? "Creating..."
                : "Create Sprint"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}