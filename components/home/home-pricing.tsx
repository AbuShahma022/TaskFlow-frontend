import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    description: "For individuals and small teams getting started.",
    price: "$0",
    period: "forever",
    features: [
      "Create organizations",
      "Create projects",
      "Manage tasks and sprints",
      "Team collaboration",
      "Basic activity logs",
    ],
    popular: false,
  },
  {
    name: "Pro",
    description: "For teams that need more room to grow.",
    price: "20$",
    period: "per subscription",
    features: [
      "Everything in Free",
      "Higher project and team limits",
      "Advanced workspace capabilities",
      "Subscription management",
      "Secure online payments",
    ],
    popular: true,
  },
];

export function HomePricing() {
  return (
    <section
      id="pricing"
      className="border-b py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-primary">
            Pricing
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Start free. Upgrade when you need.
          </h2>

          <p className="mt-4 text-muted-foreground">
            Choose the plan that fits your team's workflow.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border bg-card p-6 sm:p-8 ${
                plan.popular
                  ? "border-primary shadow-lg"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                  Recommended
                </div>
              )}

              <div>
                <h3 className="text-xl font-semibold">
                  {plan.name}
                </h3>

                <p className="mt-2 min-h-12 text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              <div className="mt-6">
                <span className="text-4xl font-bold">
                  {plan.price}
                </span>

                <span className="ml-2 text-sm text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-8 w-full"
                variant={plan.popular ? "default" : "outline"}
                asChild
              >
                <Link href="/register">
                  {plan.popular ? "Get Started" : "Start Free"}
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}