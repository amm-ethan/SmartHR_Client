import {createFileRoute, Outlet} from '@tanstack/react-router'
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";
import {NavUser} from "@/components/nav-user.tsx";
import NotificationBox from "@/components/notification-box.tsx";

export const Route = createFileRoute('/_auth')({
    // beforeLoad: ({context, location}) => {
    //     // @ts-ignore
    //     if (!context.auth.isAuthenticated) {
    //         throw redirect({
    //             to: '/login',
    //             search: {
    //                 redirect: location.href,
    //             },
    //         })
    //     }
    // },
    component: RouteComponent,
})

const data = {
    user: {
        name: "admin",
        email: "admin@example.com",
        avatar: "/avatars/avatar.png",
    },
}

function RouteComponent() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset"/>
            <SidebarInset>
                <header
                    className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 md:h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
                    <div className="flex w-full items-center gap-1 mx-4 lg:gap-2 lg:px-6">
                        <SidebarTrigger/>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <h1 className="text-base font-medium">Your Company</h1>
                    </div>
                    <div className="flex flex-row gap-2 mx-4">
                        <NotificationBox/>
                        <NavUser user={data.user}/>
                    </div>
                </header>
                <div className="p-8">
                    <Outlet/>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

