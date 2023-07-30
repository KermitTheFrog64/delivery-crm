import React from "react"

import { useAppDispatch } from "../../shared/hooks/redux"

import ModalWindow, { ModalWindowProps } from "../../shared/ui/ModalWindow"
import { Address, Order, createOrder } from "./order-slice"
import DispatcherOrderForm from "./DispatcherOrderForm"

interface DispatcherOrderModalProps extends ModalWindowProps {
    onSubmit?: (values: Order) => void
}

const DispatcherOrderModal: React.FC<DispatcherOrderModalProps> = ({ display, onClose, onSubmit }) => {

    const dispatch = useAppDispatch()

    const initialValues: any = {
        city: '',
        street: '',
        flat: '',
        house: ''
    }

    const handleSubmit = (values: any) => {
        const { client, flat, house, street, city } = values
        
        dispatch(createOrder({
            id: Date.now(),
            statusId: 1,
            client,
            delivery: {
                id: Date.now(),
                statusId: 1,
                address: {
                    id: Date.now(),
                    flat, house, street, city
                }
            }
        }))

        onSubmit && onSubmit(values)
    }

    return (
        <ModalWindow
            name="Создать заказ"
            display={display}
            onClose={onClose}
        >
            {display && <DispatcherOrderForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />}
        </ModalWindow>
    )
}

export default DispatcherOrderModal