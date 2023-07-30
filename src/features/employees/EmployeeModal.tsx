import React from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

import ModalWindow, { ModalWindowProps } from "../../shared/ui/ModalWindow"
import EmployeeForm from "./EmployeeForm"
import { Employee, createEmployee, getEmployeeById, updateEmployee } from "./employees-slice"

interface EmployeeModalProps extends ModalWindowProps {
    employeeId?: number
    onSubmit?: (employee: Employee) => void
}

const EmployeeModal: React.FC<EmployeeModalProps> = ({ display, employeeId, onClose, onSubmit }) => {

    const dispatch = useAppDispatch()
    
    const employee = useAppSelector( getEmployeeById( employeeId || 0 ) )

    const initialValues: Employee = {
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirmation: '',
        ...employee || {}
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    const onEmployeeSubmit = ( employee: Employee ) => {
        
        if ( employeeId ) {
            dispatch(updateEmployee(employee))
        } else {
            dispatch(createEmployee(employee))
        }

        onSubmit && onSubmit(employee)
    }

    return (
        <ModalWindow
            name="Изменить сотрудника"
            display={display}
            onClose={onClose}
        >
            {!!display && <EmployeeForm
                initialValues={initialValues}
                onSubmit={onEmployeeSubmit}
            />}
        </ModalWindow>
    )
}

export default EmployeeModal