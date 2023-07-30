import React from "react"
import { DefaultLayout } from "../shared"
import { LogIn } from "../features/authorization"

const LogInPage: React.FC = () => {

    return (
        <DefaultLayout center>
            <LogIn />
        </DefaultLayout>
    )
}

export default LogInPage