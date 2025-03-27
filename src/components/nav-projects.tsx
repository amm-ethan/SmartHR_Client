"use client"

import {
    type LucideIcon,
} from "lucide-react"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar.tsx"
import {useMatchRoute} from "@tanstack/react-router";

export function NavProjects({projects,}: {
    projects: {
        name: string
        url: string
        icon: LucideIcon
    }[]
}) {
    const matchRoute = useMatchRoute();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>Features</SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild className={
                            `${matchRoute({to: item.url})
                                ? 'bg-sidebar-accent '
                                : ''}
                            \`}`}>
                            <a href={item.url}>
                                <item.icon/>
                                <span>{item.name}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
