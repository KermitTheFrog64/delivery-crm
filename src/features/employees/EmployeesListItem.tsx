import React from "react"
import { Employee } from "./employees-slice"

interface EmployeesListItemProps extends Employee {
    handleIdClick: ( id: number ) => void
}

const EmployeesListItem: React.FC<EmployeesListItemProps> = ({ id, name, role, handleIdClick }) => {

    const onItemClick = () => id && handleIdClick(id)

    return (
        <tr>
            <td onClick={onItemClick} >
                {id}
            </td>
            <td>
                {name}
            </td>
            <td>
                {role?.name}
            </td>
        </tr>
    )
}

export default EmployeesListItem