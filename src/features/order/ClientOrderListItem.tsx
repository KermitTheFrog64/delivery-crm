import React from "react"
import { Delivery } from "./order-slice"
import { Row } from "../../shared/ui"
import { Status } from "./OrderStatus"

interface ClientOrderListItemProps {
    id: number
    statusId: number
    delivery?: Delivery
}

const ClientOrderListItem: React.FC<ClientOrderListItemProps> = ({ id, statusId, delivery }) => {

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

    const status = statuses.find(({ id }) => id === statusId)

    const address = `${delivery?.address.city}, ${delivery?.address.street}, ${delivery?.address.house}, кв. ${delivery?.address.flat}`

    return (
        <div>
            <Row>
                <div className="block row">
                    <Row>
                        <h2>Заказ №{id}</h2>
                    </Row>
                    <Row>
                        <h3>Статус:</h3><br />
                        {status?.label}
                    </Row>
                    <Row>
                        <h3>Адрес доставки:</h3><br />
                        {address}
                    </Row>
                </div>
            </Row>
        </div>
    )
}

export default ClientOrderListItem