"use client";

import { ChevronsUpDown, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { OrganizationMembership } from "@/types/organization";

interface OrganizationSwitcherProps {
  organizations: OrganizationMembership[];
}

export function OrganizationSwitcher({
  organizations,
}: OrganizationSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 max-w-60 justify-between gap-3 px-2"
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              T
            </div>

            <span className="truncate text-sm font-medium">
              Select organization
            </span>
          </div>

          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {organizations.length > 0 ? (
          organizations.map((membership) => (
            <DropdownMenuItem key={membership.id}>
              <div className="flex flex-col">
                <span>{membership.organization.name}</span>

                <span className="text-xs text-muted-foreground">
                  {membership.role}
                </span>
              </div>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem disabled>
            <span className="text-muted-foreground">No organizations yet</span>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Plus className="size-4" />
          Create organization
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}