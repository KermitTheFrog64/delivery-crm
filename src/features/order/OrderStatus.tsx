import React, { useState } from "react"
import { changeStatus } from "./order-slice"
import { useAppDispatch } from "../../shared/hooks/redux"

export interface Status {
    id: number
    label: string
}

interface OrderStatusProps {
    id: number
    statusId: number
    onChange?: (status: Status) => void
}

const OrderStatus: React.FC<OrderStatusProps> = ({ id, statusId, onChange }) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState<number>(statusId)

    const statuses: Status[] = [
        {
            id: 1,
            label: "Создан",
        },
        {
            id: 2,
            label: "Принят в обработку",
        },
        {
            id: 3,
            label: "Готовиться к отправке",
        },
        {
            id: 4,
            label: "Отправлен",
        },
        {
            id: 5,
            label: "Доставлен на склад",
        },
        {
            id: 6,
            label: "Получен",
        },
        {
            id: 7,
            label: "Отменён",
        }
    ]

    const onChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const statusId = Number(event.target.value)
        setValue(statusId)
        dispatch(changeStatus({id, statusId}))
    }

    return (
        <select onChange={onChangeStatus} value={value} >
            {statuses.map(({ label, id }) => <option key={id} value={id} >{label}</option>)}
        </select>
    )
}

export default OrderStatus