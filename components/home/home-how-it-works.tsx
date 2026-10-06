import { Building2, FolderKanban, CheckSquare } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Create your workspace",
    description:
      "Create an organization and bring your team together in one shared workspace.",
  },
  {
    number: "02",
    icon: FolderKanban,
    title: "Create projects",
    description:
      "Organize your work into projects and add the team members who need access.",
  },
  {
    number: "03",
    icon: CheckSquare,
    title: "Manage and deliver",
    description:
      "Create tasks, assign work, run sprints, and track progress until everything is done.",
  },
];

export function HomeHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="border-b py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            How it works
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            From idea to completed work
          </h2>

          <p className="mt-4 text-muted-foreground">
            Get your team organized and start managing projects in
            just a few simple steps.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative rounded-xl border bg-card p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>

                  <span className="text-4xl font-bold text-muted/40">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-semibold">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}