import React from "react"
import { DefaultLayout } from "../shared"
import { DeliveryList } from "../features/delivery"
import { RoleGuard } from "../features/role-guard"


const Courier: React.FC = () => {
    return (
        <DefaultLayout>
            <RoleGuard role="courier" to="/">
                <DeliveryList />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default Courier