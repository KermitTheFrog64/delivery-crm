import React, { useState } from "react"
import { useAppDispatch } from "../../shared/hooks/redux"
import { Status } from "../order/OrderStatus"
import { changeStatus } from "./delivery-slice"

interface DeliveryStatusProps {
    id: number
    statusId: number
}

const DeliveryStatus: React.FC<DeliveryStatusProps> = ({ id, statusId }) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<number>(statusId)

    const statuses: Status[] = [
        {
            id: 1,
            label: "Ожидает",
        },
        {
            id: 2,
            label: "В процессе",
        },
        {
            id: 3,
            label: "Завершена",
        },
        {
            id: 4,
            label: "Отложена",
        },
        {
            id: 5,
            label: "Не удалось доставить",
        }
    ]

    const onChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const statusId = Number(event.target.value)
        setValue(statusId)
        dispatch(changeStatus({id, statusId}))
    }

    return (
        <div>
            <select onChange={onChangeStatus} value={value} >
                {statuses.map(({ label, id }) => <option key={id} value={id} >{label}</option>)}
            </select>
        </div>
    )
}

export default DeliveryStatus