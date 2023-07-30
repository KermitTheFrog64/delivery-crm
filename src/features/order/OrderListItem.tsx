import React from "react"

import OrderStatus from "./OrderStatus"

import { Delivery } from "./order-slice"
import { Client } from "../client/client-slice"

interface OrderListItemProps {
    id: number
    statusId: number
    delivery?: Delivery
    client?: Client
    linkedId: boolean
    onClick: (id: number) => void
}

const OrderListItem: React.FC<OrderListItemProps> = ({ id, statusId, delivery, client, linkedId, onClick }) => {

    const { city, street, flat, house } = delivery?.address || {}

    const onItemClick = () => linkedId && onClick( id )

    return (
        <tr>
            <td onClick={onItemClick}>
                {id}
            </td>
            <td>
                {city}, {street}, {house}, {flat}
            </td>
            <td>
                {client?.name || ''}
            </td>
            <td>
                <OrderStatus id={id} statusId={statusId} />
            </td>
        </tr>
    )
}

export default OrderListItem