"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "../ModeToggle";
import { UserProfile } from "./user-profile";
import { OrganizationSwitcher } from "./organization-switcher";
export function AppHeader() {
    
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger />

      <Separator orientation="vertical" className="mr-2 h-4" />

      <div className="flex flex-1 items-center justify-between gap-2">
        <h1 className="text-sm font-medium">TaskFlow</h1>

        <div className="ml-auto flex items-center gap-3">
          <OrganizationSwitcher/>
          <ModeToggle />
          <UserProfile />
        </div>
      </div>
    </header>
  )
}