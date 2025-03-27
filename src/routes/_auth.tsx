import {createFileRoute, Outlet} from '@tanstack/react-router'
import {AppSidebar} from "@/components/app-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {Separator} from "@/components/ui/separator.tsx";

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

function RouteComponent() {
    return (
        <SidebarProvider>
            <AppSidebar variant="inset"/>
            <SidebarInset>
                <header
                    className="mb-4 group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
                    <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
                        <SidebarTrigger className="-ml-1"/>
                        <Separator
                            orientation="vertical"
                            className="mx-2 data-[orientation=vertical]:h-4"
                        />
                        <h1 className="text-base font-medium">Dashboard</h1>
                    </div>
                </header>
                <Outlet/>
            </SidebarInset>
        </SidebarProvider>
    )
}

