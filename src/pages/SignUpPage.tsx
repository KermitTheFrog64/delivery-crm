import React from "react"
import { DefaultLayout } from "../shared"
import { SignUp } from "../features/authorization"

const SignUpPage: React.FC = () => {

    return (
        <DefaultLayout center>
            <SignUp />
        </DefaultLayout>
    )
}

export default SignUpPage