"use client"

import { ChevronsUpDown, Plus, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useOrganization } from "@/providers/organization-provider"




export function OrganizationSwitcher() {
 const {
    organizations,
    isLoading,
    isError,
    selectedOrganizationId,
    setSelectedOrganizationId,
  } = useOrganization();  


  const selectedOrganization = organizations.find(
    (membership) => membership.organization.id === selectedOrganizationId
  )


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-9 max-w-60 justify-between gap-3 px-2"
        >
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-primary text-xs font-semibold text-primary-foreground">
              {selectedOrganization?.organization.logo ? (
                <img
                  src={selectedOrganization.organization.logo}
                  alt={selectedOrganization.organization.name}
                  className="size-full object-cover"
                />
              ) : (
                (selectedOrganization?.organization.name
                  ?.charAt(0)
                  .toUpperCase() ?? "O")
              )}
            </div>
            <span className="truncate text-sm font-medium">
              {isLoading
                ? "Loading organizations..."
                : isError
                  ? "Unable to load organizations"
                  : selectedOrganization
                    ? selectedOrganization.organization.name
                    : organizations.length > 0
                      ? "Select organization"
                      : "No organization"}
            </span>
          </div>

          <ChevronsUpDown className="size-4 shrink-0 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="w-60">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {organizations.length > 0 ? (
          organizations.map((membership) => {
            const isSelected =
              membership.organization.id === selectedOrganizationId

            return (
              <DropdownMenuItem
                key={membership.id}
                onClick={() => {
                  setSelectedOrganizationId(membership.organization.id)
                }}
                className={isSelected ? "bg-accent" : undefined}
              >
                <div className="flex items-center gap-2">
                  <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted text-xs font-medium">
                    {membership.organization.logo ? (
                      <img
                        src={membership.organization.logo}
                        alt={membership.organization.name}
                        className="size-full object-cover"
                      />
                    ) : (
                      membership.organization.name.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className="flex min-w-0 flex-col">
                    <span className="truncate">
                      {membership.organization.name}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {membership.role}
                    </span>
                  </div>

                  {isSelected && <Check className="ml-auto size-4" />}
                </div>
              </DropdownMenuItem>
            )
          })
        ) : (
          <DropdownMenuItem disabled>
            <span className="text-muted-foreground">No organizations yet</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
