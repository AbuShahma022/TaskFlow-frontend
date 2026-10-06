import {
  FiUsers,
  FiCheckSquare,
  FiFolder,
  FiBarChart2,
  FiShield,
  FiCreditCard,
} from "react-icons/fi";

const features = [
  {
    icon: FiFolder,
    title: "Project Management",
    description:
      "Create and organize projects, manage members, and keep your entire team aligned.",
  },
  {
    icon: FiCheckSquare,
    title: "Task Management",
    description:
      "Create tasks, assign work, set priorities, track progress, and manage deadlines.",
  },
  {
    icon: FiUsers,
    title: "Team Collaboration",
    description:
      "Organize your teams and collaborate efficiently across projects and organizations.",
  },
  {
    icon: FiBarChart2,
    title: "Sprint Management",
    description:
      "Plan sprints, track active work, and keep your development workflow organized.",
  },
  {
    icon: FiShield,
    title: "Role-Based Access",
    description:
      "Keep your workspace secure with organization and platform-level permissions.",
  },
  {
    icon: FiCreditCard,
    title: "Simple Billing",
    description:
      "Manage your subscription and payments securely with integrated payment processing.",
  },
];

export function HomeFeatures() {
  return (
    <section
      id="features"
      className="border-b py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Everything you need
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful tools for better teamwork
          </h2>

          <p className="mt-4 text-muted-foreground">
            TaskFlow gives your team the tools to plan projects,
            organize tasks, collaborate, and deliver work efficiently.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-xl border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="text-xl" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}