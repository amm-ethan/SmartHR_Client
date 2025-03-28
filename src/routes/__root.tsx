import {Outlet, createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'


export const Route = createRootRoute({
    component: () => (
        <>
            <div className="relative min-h-svh">
                <Outlet/>
            </div>
            <TanStackRouterDevtools position={"bottom-right"}/>
        </>
    ),
})