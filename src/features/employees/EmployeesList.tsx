import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

import { getEmployees, fetchEmployees } from "./employees-slice"
import EmployeesListItem from "./EmployeesListItem"
import EmployeeModal from "./EmployeeModal"
import { Row } from "../../shared/ui"

const EmployeesList: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])

    const list = useAppSelector(getEmployees)

    const [filterValue, setFilterValue] = useState<string>('')

    const filteredList = filterValue == ""
        ? list
        : list.filter((item) => item.id?.toString().includes(filterValue))

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onModalDisplay = () => {
        setIsModalOpen(true)
        setEmployeeId(0)
    }
    const onModalClose = () => setIsModalOpen(false)

    const onSubmit = () => onModalClose()

    const [employeeId, setEmployeeId] = useState<number>()

    const handleIdClick = (id: number) => {
        if (id) {
            setEmployeeId(id)
            setIsModalOpen(true)
        }
    }

    return (
        <Row>

            <Row>
                <div className="flex justify-between">
                    <input
                        placeholder="Поиск"
                        type="text"
                        value={filterValue}
                        onChange={(event) => setFilterValue(event.target.value)}
                    />
                    <button onClick={onModalDisplay} >Добавить сотрудника</button>
                </div>
            </Row>

            <Row>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Имя</th>
                            <th>Должность</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredList.map((item) =>
                            <EmployeesListItem
                                key={item.id}
                                handleIdClick={handleIdClick}
                                {...item}
                            />
                        )}
                    </tbody>
                </table>
            </Row>

            <EmployeeModal
                display={isModalOpen}
                onClose={onModalClose}
                employeeId={employeeId}
                onSubmit={onSubmit}
            />

        </Row>
    )
}

export default EmployeesList