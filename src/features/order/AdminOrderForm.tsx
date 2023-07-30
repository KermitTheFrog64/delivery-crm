import React from "react"

import { Form, Field, Formik, ErrorMessage, FieldProps } from "formik"
import * as Yup from "yup"

import { Row } from "../../shared/ui"
import CourierSelection from "./CourierSelection"
import ClientSelection from "./ClientSelection"
import { Order } from "./order-slice"

interface AdminOrderFormProps {
    initialValues: Order
    onSubmit: (values: Order) => void
}

const AdminOrderForm: React.FC<AdminOrderFormProps> = ({ initialValues, onSubmit }) => {

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                flat: Yup.number()
                    .typeError('Должно быть число')
                    .max(99999, 'Слишком большой номер квартиры')
                    .required('Это поле обязательно'),
                house: Yup.string()
                    .max(3, 'Номер дома не должен превышать 3 знаков')
                    .required('Это поле обязательно'),
                street: Yup.string()
                    .max(20, 'Название улицы не должно превышать 20 знаков')
                    .required('Это поле обязательно'),
                city: Yup.string()
                    .max(15, 'Название города не должно превышать 15 знаков')
                    .required('Это поле обязательно')
            })}
            onSubmit={onSubmit}
        >
            <Form>

                <Row>
                    <h3>Клиент</h3>

                    <Field
                        name="client"
                        render={({ field: { value }, form: { setFieldValue } }: FieldProps) => (
                            <ClientSelection
                                id={value?.id}
                                onSelect={(client) => setFieldValue('client', client)}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <h3>Курьер</h3>

                    <Field
                        name="courier"
                        render={({ field: { value }, form: { setFieldValue } }: FieldProps) => (
                            <CourierSelection
                                id={value?.id}
                                onSelect={(courier) => setFieldValue('courier', courier)}
                            />
                        )}
                    />
                </Row>

                <Row>
                    <h3>Адрес доставки</h3>

                    <Row>
                        <label className="input">Квартира</label><br />
                        <Field name="flat" type="text" /><br/>
                        <ErrorMessage name="flat" />
                    </Row>

                    <Row>
                        <label>Дом</label><br />
                        <Field name="house" type="text" /><br/>
                        <ErrorMessage name="house" />
                    </Row>

                    <Row>
                        <label>Улица</label><br />
                        <Field name="street" type="text" /><br/>
                        <ErrorMessage name="street" />
                    </Row>

                    <Row>
                        <label>Город</label><br />
                        <Field name="city" type="text" /><br/>
                        <ErrorMessage name="city" />
                    </Row>
                </Row>

                <Row>
                    <button type="submit">
                        Сохранить
                    </button>
                </Row>

            </Form>
        </Formik>
    )
}

export default AdminOrderForm