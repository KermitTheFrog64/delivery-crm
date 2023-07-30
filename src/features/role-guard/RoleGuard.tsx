import React, { ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppSelector } from "../../shared/hooks/redux"

import { RoleType, getAccessToken, getUser } from "../../app/app-slice"


interface RoleGuardProps {
    children?: ReactNode
    role: RoleType
    to?: string
}

const RoleGuard: React.FC<RoleGuardProps> = ({ role, to, children }) => {

    const user = useAppSelector(getUser)
    
    const access_token = useAppSelector(getAccessToken)

    const navigate = useNavigate()

    useEffect(() => {
        if ( ( user || ( !user && !access_token ) ) && to && role !== user?.role?.type) {
            navigate(to)
        }
    }, [])

    if (!user) {
        return null
    }

    if (role === user.role?.type) {
        return (
            <>
                {children}
            </>
        )
    }

    return null

}

export default RoleGuard