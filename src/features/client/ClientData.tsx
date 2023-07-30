import React, { useEffect, useRef, useState } from "react"

import { useAppSelector } from "../../shared/hooks/redux"

import ClientModal from "./ClientModal"
import { Row } from "../../shared/ui"
import { getUser } from "../../app/app-slice"

const ClientData: React.FC = () => {

    const client = useAppSelector(getUser)

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const onModalDisplay = () => setIsModalOpen(true)

    const onModalClose = () => setIsModalOpen(false)

    const onSubmit = () => onModalClose()
    
    return (
        <Row>

            <Row>

                <Row>
                    <h2>Учётные данные</h2>
                </Row>
                <br />
                <Row>
                    <div className="block row">
                        <h3>ФИО </h3><br />
                        {client?.name}
                    </div>
                </Row>
                <br />
                <Row>
                    <div className="block row">
                        <h3>Почта</h3><br />
                        {client?.email}
                    </div>
                </Row>
                <br />
                <Row>
                    <div className="block row">
                        <h3>Номер телефона</h3><br />
                        {client?.phoneNumber}
                    </div>
                </Row>

            </Row>

            <Row>
                <button onClick={onModalDisplay} >Изменить</button>
            </Row>

            <ClientModal
                display={isModalOpen}
                onClose={onModalClose}
                onSubmit={onSubmit}
                client={client}
            />
        </Row>
    )
}

export default ClientData