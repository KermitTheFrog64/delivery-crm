import React, { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

import { fetchOrders, getClientOrdersById, getOrders } from "./order-slice"
import { OrderListItem } from "./index"
import DispatcherOrderModal from "./DispatcherOrderModal"
import AdminOrderModal from "./AdminOrderModal"
import { Row } from "../../shared/ui"
import { fetchCurrentUser, getUser } from "../../app/app-slice"
import ClientOrderListItem from "./ClientOrderListItem"

interface OrderListProps {
    permissions?: "admin" | "client" | "dispatcher"
}

const OrderList: React.FC<OrderListProps> = ({ permissions }) => {

    
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchOrders())
    }, [])

    const list = useAppSelector(getOrders)

    const [filterValue, setFilterValue] = useState("")

    const filteredList = filterValue == ""
        ? list
        : list.filter((item) => item.id.toString().includes(filterValue))

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onModalDisplay = () => {
        setIsModalOpen(true)
        setOrderId(0)
    }

    const onModalClose = () => setIsModalOpen(false)

    const onSubmit = () => onModalClose()

    const [orderId, setOrderId] = useState<number>()

    const onOrderClick = (id: number) => {
        setOrderId(id)
        setIsModalOpen(true)
    }
    

    if (permissions === "client") {

        const client = useAppSelector(getUser)

        let clientOrders = null

        if (client?.id) {
            clientOrders = useAppSelector(getClientOrdersById(client.id))
        }

        return (
            <div>
                {clientOrders && clientOrders.map((item) => <ClientOrderListItem key={item.id} {...item} />)}
            </div>
        )
    } else {

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
                        <button onClick={onModalDisplay} >Добавить заказ</button>
                    </div>
                </Row>

                <Row>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Адрес доставки</th>
                                <th>Клиент(ка)</th>
                                <th>Статус заказа</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredList.map((item) => <OrderListItem
                                key={item.id}
                                linkedId={permissions === "admin"}
                                onClick={onOrderClick}
                                {...item}
                            />)}
                        </tbody>
                    </table>
                </Row>

                {permissions === 'dispatcher' && <DispatcherOrderModal
                    display={isModalOpen}
                    onClose={onModalClose}
                    onSubmit={onSubmit}
                />}

                {permissions === 'admin' && <AdminOrderModal
                    display={isModalOpen}
                    onClose={onModalClose}
                    onSubmit={onSubmit}
                    orderId={orderId}
                />}

            </Row>
        )
    }
    return (
        <div>
            Interface is not available
        </div>
    )

    
}

export default OrderList