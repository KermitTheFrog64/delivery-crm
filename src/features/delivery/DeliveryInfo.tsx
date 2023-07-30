import React, { useEffect, useState } from "react"
import { useAppSelector } from "../../shared/hooks/redux"
import { getDeliveryById } from "./delivery-slice"
import DeliveryStatus from "./DeliveryStatus"

import { YMaps, Map } from '@pbe/react-yandex-maps'
import { Row } from "../../shared/ui"

import "../../app/style.scss"

interface DeliveryInfoProps {
    id: number
}

const DeliveryInfo: React.FC<DeliveryInfoProps> = ({ id }) => {

    const delivery = useAppSelector(getDeliveryById(id))

    if (!delivery) {
        return (
            <div>delivery not found</div>
        )
    }

    const address = `${delivery.address.city}, ${delivery.address.street}, ${delivery.address.house}`

    const fullAddress = `${delivery.address.city}, ${delivery.address.street}, 
    ${delivery.address.house}, кв. ${delivery.address.flat}`

    const YOUR_API_KEY = 'c734568c-a594-4bf5-9216-1a7dc79fd947'

    const [coords, setCoords] = useState([])

    useEffect(() => {
        const apiUrl = `https://geocode-maps.yandex.ru/1.x/?apikey=${YOUR_API_KEY}&geocode=${address}&format=json`
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                setCoords(coordinates);
            })
    }, [])

    return (
        <Row>
            <div className="delivery-block">
                <div className="left-section info-container">
                    <Row>
                        <h2>Доставка №:{delivery.id}</h2>
                    </Row>
                    <Row>
                        <div className="block row inline-block">
                            <h3>Статус доставки:</h3><br />
                            <DeliveryStatus id={delivery.id} statusId={delivery.statusId} />
                        </div>
                    </Row>
                    <Row>
                        <div className="block row inline-block">
                            <h3>ID заказа:</h3><br />
                            {delivery.order?.id}
                        </div>
                    </Row>
                    <Row>
                        <div className="block row inline-block">
                            <h3>Адрес доставки: </h3><br />
                            {fullAddress}
                        </div>
                    </Row>
                    <Row>
                        <div className="block row inline-block">
                            <h3>Информация о клиенте:</h3><br />
                            <p>
                                <b>ФИО: </b>
                                {delivery.order?.client?.name} <br />
                                <strong>Номер телефона: </strong>
                                {delivery.order?.client?.phoneNumber}
                            </p>
                        </div>
                    </Row>
                </div>
                <div className="right-section">
                    <Row>
                        <YMaps>
                            <Map
                                className="map block"
                                defaultState={{ center: coords, zoom: 9 }}
                            />
                        </YMaps>
                    </Row>
                </div>
            </div>
        </Row>
    )
}

export default DeliveryInfo