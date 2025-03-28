"use client"

import * as React from "react"
import {
    LayoutDashboard,
    Watch,
    Users,
    UserSearch,
    Handshake,
    BellElectric,
    Presentation,
    Gauge,
    Scroll,
    CalendarDays,
    PartyPopper,
    Library,
    Radio,
    UserCog,
    SettingsIcon,
    Feather

} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader, SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import {NavSecondary} from "@/components/nav-secondary.tsx";


const data = {
    navMain: [
        {
            title: "Leave & Attendance",
            url: "#",
            icon: Watch,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Employee Database",
            url: "#",
            icon: Users,
            items: [
                {
                    title: "Employees",
                    url: "/employee-mgmt/employees",
                },
                {
                    title: "Departments",
                    url: "/employee-mgmt/departments",
                },
                {
                    title: "Organization Structure",
                    url: "/employee-mgmt/org-structure",
                }
            ],
        },
        {
            title: "Recruitment",
            url: "#",
            icon: UserSearch,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Onboarding",
            url: "#",
            icon: Handshake,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "Overtime",
            url: "#",
            icon: BellElectric,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "T&D",
            url: "#",
            icon: Presentation,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
        {
            title: "KPI",
            url: "#",
            icon: Gauge,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    navProjects: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Report & Analytics",
            url: "#",
            icon: Scroll,
        },
        {
            name: "Event Planning",
            url: "#",
            icon: PartyPopper,
        },
        {
            name: "Documents",
            url: "#",
            icon: Library,
        },
        {
            name: "Calender",
            url: "#",
            icon: CalendarDays,
        },
        {
            name: "Broadcasting",
            url: "#",
            icon: Radio,
        },
    ],
    navSecondary: [
        {
            title: "Access Logs",
            url: "/access-logs",
            icon: Feather,
        },
        {
            title: "Access Management",
            url: "/access-mgmt",
            icon: UserCog,
        },
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="items-center">
                        <SidebarMenuButton size="default">
                            <img src="/assets/logo.ico" alt="smart logo" width="32" height="32"/>
                            <div className="group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-semibold">
                                        Smart HR
                                    </span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.navProjects}/>
            </SidebarContent>
            <SidebarFooter className="px-0">
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarFooter>
        </Sidebar>
    )
}
