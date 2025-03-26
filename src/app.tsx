import {RouterProvider, createRouter, Navigate} from '@tanstack/react-router'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Toaster} from "sonner";

// Import the generated route tree
import {routeTree} from '@/routeTree.gen'
import {useAuth} from "@/lib/auth.tsx";

// Create a QueryClient instance
const queryClient = new QueryClient();


// Create a new router instance
const router = createRouter({
    routeTree,
    context: {
        auth: undefined!, // This will be set after we wrap the app in an AuthProvider
    },
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultStructuralSharing: true,
    defaultPreloadStaleTime: 0,
    defaultNotFoundComponent: () => <Navigate to="/"/>
})

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router
    }
}

export function App() {
    const auth = useAuth()
    return <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} context={{auth}}/>
        <Toaster position="top-center"/>
    </QueryClientProvider>
}