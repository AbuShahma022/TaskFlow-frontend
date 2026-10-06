"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../ModeToggle";

export function AdminHeader() {
  return (
    <header className="flex h-14 items-center gap-3 border-b px-4">
  <SidebarTrigger />

  <Separator orientation="vertical" className="h-5" />

  <div>
    <p className="text-sm font-medium">Admin Panel</p>
  </div>

  <div className="ml-auto">
    <ModeToggle/>
  </div>
</header>
  );
}