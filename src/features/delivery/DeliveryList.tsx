import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"
import { getDeliveries, fetchDeliveries } from "./delivery-slice"
import DeliveryListItem from "./DeliveryListItem"
import { Row } from "../../shared/ui"

const DeliveryList: React.FC = () => {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchDeliveries())
    })

    const list = useAppSelector(getDeliveries)

    return (
        <Row>
            <Row>
                <table>
                    <thead>
                        <tr>
                            <th>Доставка</th>
                            <th>Статус</th>
                            <th>Заказ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => <DeliveryListItem
                            key={item.id}
                            {...item}
                        />)}
                    </tbody>
                </table>
            </Row>
        </Row>
    )
}

export default DeliveryList