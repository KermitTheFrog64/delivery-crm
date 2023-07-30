import React from "react"
import { useParams } from "react-router-dom"
import { DefaultLayout } from "../shared"
import DeliveryInfo from "../features/delivery/DeliveryInfo"

const Delivery: React.FC = () => {

    const { id } = useParams();

    return (
        <DefaultLayout>
            <DeliveryInfo id={Number(id)} />
        </DefaultLayout>
    )
}

export default Delivery