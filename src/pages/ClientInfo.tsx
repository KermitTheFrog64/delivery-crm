import React from "react"
import { DefaultLayout } from "../shared"
import { RoleGuard } from "../features/role-guard"
import { ClientData } from "../features/client"

const ClientInfo: React.FC = () => {
    return (
        <DefaultLayout>
            <RoleGuard role="client" to="/" >
                <ClientData />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default ClientInfo