import {createFileRoute, redirect} from '@tanstack/react-router'
import {getStoredUser} from "@/lib/auth.tsx";

// Function to check authentication status
const isAuthenticated = () => !!getStoredUser()

export const Route = createFileRoute('/')({
    component: RouteComponent,
    beforeLoad: async ({location}) => {
        if (!isAuthenticated()) {
            throw redirect({
                to: '/login',
                search: {
                    // Use the current location to power a redirect after login
                    // (Do not use `router.state.resolvedLocation` as it can
                    // potentially lag behind the actual current location)
                    redirect: location.href,
                },
            })
        } else {
            throw redirect({
                to: '/dashboard',
                search: {
                    // Use the current location to power a redirect after login
                    // (Do not use `router.state.resolvedLocation` as it can
                    // potentially lag behind the actual current location)
                    redirect: location.href,
                },
            })
        }
    },
})

function RouteComponent() {
    return <></>
}