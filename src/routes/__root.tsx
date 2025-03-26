import {Outlet, createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/react-router-devtools'


export const Route = createRootRoute({
    component: () => (
        <>
            <div className="relative min-h-svh">
                {/* Background image with opacity - moved to cover entire page */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat "
                    style={{
                        backgroundColor: "#FEFCFF"
                    }}
                />

                {/* Content */}
                <div className="relative">
                    <Outlet/>
                </div>
            </div>

            <TanStackRouterDevtools/>
        </>
    ),
})