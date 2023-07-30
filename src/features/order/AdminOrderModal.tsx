import React from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

import ModalWindow, { ModalWindowProps } from "../../shared/ui/ModalWindow"
import AdminOrderForm from "./AdminOrderForm"
import { Order, createOrder, getOrderById, updateOrder } from "./order-slice"
import OrderStatus from "./OrderStatus"
import { DeliveryStatus } from "../delivery"

interface AdminOrderModalProps extends ModalWindowProps {
    orderId?: number
    onSubmit?: (order: Order) => void
}

const AdminOrderModal: React.FC<AdminOrderModalProps> = ({ display, orderId, onClose, onSubmit }) => {

    const dispatch = useAppDispatch()
    
    const order = useAppSelector( getOrderById( orderId || 0 ) )

    const initialValues: Order = {
        id: Date.now(),
        statusId: 1,
        ...order || {}
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
    const onOrderSubmit = ( order: Order ) => {
        
        if ( orderId ) {
            dispatch(updateOrder(order))
        } else {
            dispatch(createOrder(order))
        }

        onSubmit && onSubmit(order)
    }

    return (
        <ModalWindow
            name={orderId ? "Редактировать заказ" : "Создать заказ"}
            display={display}
            onClose={onClose}
        >
            <OrderStatus
            id={orderId ? orderId : Date.now()}
            statusId={order ? order?.statusId : 1}
            />

            {!!display && <AdminOrderForm
                initialValues={initialValues}
                onSubmit={onOrderSubmit}
            />}
            
            <DeliveryStatus
            id={order?.delivery ? order?.delivery?.id : Date.now()}
            statusId={order?.delivery ? order.delivery.id : 1}
            />
        </ModalWindow>
    )
}

export default AdminOrderModal