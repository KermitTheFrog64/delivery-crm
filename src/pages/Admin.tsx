import React from "react"
import { DefaultLayout } from "../shared"
import { OrderList } from "../features/order"
import { RoleGuard } from "../features/role-guard"

const Admin: React.FC = () => {

    return (
        <DefaultLayout>
            <RoleGuard role="admin" to="/">
                <OrderList permissions="admin" />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default Admin