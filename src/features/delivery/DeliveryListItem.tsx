import React from "react"
import { Order } from "../order/order-slice"
import DeliveryStatus from "./DeliveryStatus"
import { useNavigate } from "react-router-dom"

interface DeliveryListItemProps {
    id: number
    statusId: number
    order?: Order
}

const DeliveryListItem: React.FC<DeliveryListItemProps> = ({ id, statusId, order }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/deliveries/${id}`)
    }

    return (
        <tr>
            <td onClick={handleClick} >
                {id}
            </td>
            <td>
                <DeliveryStatus id={id} statusId={statusId} />
            </td>
            <td>
                {order?.id}
            </td>
        </tr>
    )
}

export default DeliveryListItem