import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"
import { fetchRoles, getRoles } from "./employees-slice"
import { Role } from "../../app/app-slice"
import { Field } from "formik"

interface RoleSelectionProps {
    id?: number
    onSelect?: (role: Role) => void
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ id, onSelect }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchRoles())
    }, [])

    const roles = useAppSelector(getRoles)

    const [value, setValue] = useState<number>(id || 0)

    const onChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const roleId = Number(event.target.value)

        const role = roles.find((item) => item.id === roleId)

        if (role) {
            setValue(roleId)
            onSelect && onSelect(role)
        }
        
    }

    return (
        <select name="role" onChange={onChangeRole} value={value}>
            {roles.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
        </select>
    )
}

export default RoleSelection