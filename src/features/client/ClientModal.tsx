import React, { useEffect, useRef } from "react"

import ModalWindow, { ModalWindowProps } from "../../shared/ui/ModalWindow"
import ClientForm from "./ClientForm"
import { useAppDispatch } from "../../shared/hooks/redux"
import { updateClient } from "../../app/app-slice"
import { Client } from "./client-slice"

interface ClientModalProps extends ModalWindowProps {
    onSubmit?: (client: Client) => void
    client: Client | null
}

const ClientModal: React.FC<ClientModalProps> = ({ display, onClose, onSubmit, client }) => {

    const dispatch = useAppDispatch()

    const initialValues: Client = {
        name: client?.name,
        email: client?.email,
        phoneNumber: client?.phoneNumber,
        password: '',
        passwordConfirmation: ''
    }

    const handleSubmit = (client: Client) => {
        dispatch(updateClient(client))
        onSubmit && onSubmit(client)
    }

    return (
        <ModalWindow
            name="Изменить профиль"
            display={display}
            onClose={onClose}
        >
            <ClientForm
                initialValues={initialValues}
                onSubmit={handleSubmit}
            />
        </ModalWindow>
    )
}

export default ClientModal