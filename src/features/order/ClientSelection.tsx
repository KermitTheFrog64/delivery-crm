import React, { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"
import { Client, fetchClients, getClients } from "../client/client-slice"

interface ClientSelectionProps {
    id?: number
    onSelect?: (client: Client) => void
}

const ClientSelection: React.FC<ClientSelectionProps> = ({ id, onSelect }) => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchClients())
    }, [])

    const clients = useAppSelector(getClients)
    
    const [value, setValue] = useState<number>(id || 0)

    const onChangeClient = (event: React.ChangeEvent<HTMLSelectElement>) => {

        const clientId = Number(event.target.value)

        const client = clients.find((item) => item.id === clientId)

        if (client) {
            setValue(clientId);
            onSelect && onSelect(client)
        }
    }

    return (
        <div>
            <select onChange={onChangeClient} value={value}>
                {clients.map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
            </select>
        </div>
    )
}

export default ClientSelection