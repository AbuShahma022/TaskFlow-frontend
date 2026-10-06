import Link from "next/link";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export function HomeFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2"
            >
              <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                T
              </div>

              <span className="text-lg font-bold tracking-tight">
                TaskFlow
              </span>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              A simple and powerful project management platform
              built to help teams plan, collaborate, and get work
              done.
            </p>

            <div className="mt-5 flex items-center gap-3">
              <Link
                href="#"
                aria-label="GitHub"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaGithub className="size-5" />
              </Link>

              <Link
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaLinkedin className="size-5" />
              </Link>

              <Link
                href="#"
                aria-label="Twitter"
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                <FaTwitter className="size-5" />
              </Link>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="transition-colors hover:text-foreground"
                >
                  Features
                </a>
              </li>

              <li>
                <a
                  href="#pricing"
                  className="transition-colors hover:text-foreground"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="#how-it-works"
                  className="transition-colors hover:text-foreground"
                >
                  How it works
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/about"
                  className="transition-colors hover:text-foreground"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/login"
                  className="transition-colors hover:text-foreground"
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className="transition-colors hover:text-foreground"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} TaskFlow. All rights
            reserved.
          </p>

          <p>
            Built for modern teams.
          </p>
        </div>
      </div>
    </footer>
  );
}