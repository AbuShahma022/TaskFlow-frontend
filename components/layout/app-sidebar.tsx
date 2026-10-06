"use client";

import {
  LayoutDashboard,
  Building2,
  FolderKanban,
  ListTodo,
   Activity,
   CreditCard,
   Mail,
   ShieldCheck
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
import { useAuth } from "@/providers/auth-provider";

type NavigationItem = {
  title: string;
  url: string;
  icon: React.ComponentType<{ className?: string }>;
  managerOnly?: boolean;
  adminOnly?: boolean;
};

const navigation : NavigationItem[] = [
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

  {
  title: "Subscription",
  url: "/subscription",
  icon: CreditCard,
  managerOnly: true,
},

{
  title: "Invitations",
  url: "/invitations",
  icon: Mail,
},

{
  title: "Admin Dashboard",
  url: "/admin",
  icon: ShieldCheck,
  adminOnly: true,
},
];

export function AppSidebar() {
    const { selectedMembership } = useOrganization();
    const { user } = useAuth();

  const isManager = selectedMembership?.role === "MANAGER";
  const isAdmin = user?.role === "ADMIN";
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>TaskFlow</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigation
                .filter(
                  (item) =>
                    (!item.managerOnly || isManager) &&
                    (!item.adminOnly || isAdmin)
                )
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