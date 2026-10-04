"use client";

import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  ListTodo,
   Activity,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useOrganization } from "@/providers/organization-provider";

const navigation = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organizations",
    url: "/organizations",
    icon: Building2,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: ListTodo,
  },

    {
    title: "Activity Logs",
    url: "/activity-logs",
    icon: Activity,
      managerOnly: true,
  },
];

export function AppSidebar() {
    const { selectedMembership } = useOrganization();

  const isManager = selectedMembership?.role === "MANAGER";
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>TaskFlow</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation
                .filter((item) => !item.managerOnly || isManager)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}