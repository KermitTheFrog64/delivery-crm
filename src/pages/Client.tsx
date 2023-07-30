import React from "react"
import { DefaultLayout } from "../shared"
import { OrderList } from "../features/order"
import { RoleGuard } from "../features/role-guard"


const Client: React.FC = () => {
    return (
        <DefaultLayout>
            <RoleGuard role="client" to="/" >
                <OrderList permissions="client" />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default Client