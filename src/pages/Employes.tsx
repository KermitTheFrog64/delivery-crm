import React from "react"

import { DefaultLayout } from "../shared"
import { EmployeesList } from "../features/employees"
import { RoleGuard } from "../features/role-guard"

const Employees: React.FC = () => {

    return (
        <DefaultLayout>
            <RoleGuard role="admin" to="/">
                <EmployeesList />
            </RoleGuard>
        </DefaultLayout>
    )
}

export default Employees