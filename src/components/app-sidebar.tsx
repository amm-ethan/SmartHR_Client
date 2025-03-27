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
    SearchIcon,

} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavProjects} from "@/components/nav-projects"
import {NavUser} from "@/components/nav-user"
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
    user: {
        name: "admin",
        email: "admin@example.com",
        avatar: "/avatars/avatar.png",
    },
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
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
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
            title: "OT Mgmt",
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
    projects: [
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
            name: "Documents Mgmt",
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
            title: "Search",
            url: "#",
            icon: SearchIcon,
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
                <SidebarHeader className="px-0 pl-1">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="default">
                                <div
                                    className="items-center justify-center">
                                    <img src="/assets/logo.ico" alt="smart logo" width="32" height="32"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                                    <span className="truncate font-semibold">
                                        Smart HR
                                    </span>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <NavProjects projects={data.projects}/>
                <NavSecondary items={data.navSecondary} className="mt-auto"/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    )
}
