import React from "react"
import { DefaultLayout } from "../shared"
import { OrderList } from "../features/order"
import { RoleGuard } from "../features/role-guard"


const Dispatcher: React.FC = () => {
    return (
        <DefaultLayout>
            <RoleGuard role="dispatcher" to="/" >
                <OrderList permissions="dispatcher" />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default Dispatcher