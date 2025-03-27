import {createFileRoute} from '@tanstack/react-router'
import AccessMgmtPage from "@/pages/access-mgmt";

export const Route = createFileRoute('/_auth/access-mgmt')({
    component: AccessMgmtPage,
})

