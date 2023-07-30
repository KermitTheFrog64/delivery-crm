import React, { useEffect, useState } from "react"

import { getCouriers, fetchEmployees, Employee } from "../employees/employees-slice"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

interface CourierSelectionProps {
    id?: number
    onSelect?: (courier: Employee) => void
}

const CourierSelection: React.FC<CourierSelectionProps> = ({ id, onSelect }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [])

    const couriers = useAppSelector(getCouriers)
    
    const [value, setValue] = useState<number>(id || 0)

    const onChangeCourier = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const courierId = Number(event.target.value)

        const courier = couriers.find((item) => item.id === courierId)

        if (courier) {
            setValue(courierId);
            onSelect && onSelect(courier)
        }
    }

    return (
        <div>
            <select onChange={onChangeCourier} value={value}>
                {couriers.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
        </div>
    )
}

export default CourierSelection