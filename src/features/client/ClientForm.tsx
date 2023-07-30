import React from "react"

import { Form, Field, Formik, ErrorMessage } from "formik"
import * as Yup from "yup"
import YupPassword from 'yup-password'
YupPassword(Yup) // extends yup

import { Row } from "../../shared/ui"
import { Client } from "./client-slice"

interface ClientFormProps {
    initialValues: Client
    onSubmit: (values: Client) => void
}

const ClientForm: React.FC<ClientFormProps> = ({ initialValues, onSubmit }) => {

    let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(40, 'Имя не должно превышать 40 знаков')
                    .required('Это поле обязательно'),
                phoneNumber: Yup.string()
                    .max(11, 'Номер телефона не должен превышать 11 знаков')
                    .required('Это поле обязательно'),
                email: Yup.string()
                    .email('Недопустимый Email адрес')
                    .matches(email_regx, 'Недопустимый Email адрес')
                    .required('Это поле обязательно'),
                password: Yup.string()
                    .min(8, 'Пароль не должен быть меньше 15 знаков')
                    .minLowercase(1, 'password must contain at least 1 lower case letter')
                    .minUppercase(1, 'password must contain at least 1 upper case letter')
                    .minNumbers(1, 'password must contain at least 1 number')
                    .minSymbols(1, 'password must contain at least 1 special character')
                    .required('Это поле обязательно'),
                passwordConfirmation: Yup.string()
                    .oneOf([Yup.ref('password')], 'Passwords must match')
            })}
            onSubmit={onSubmit}
        >
            <Form>

                <Row>
                    <label>Имя:</label><br />
                    <Field name="name" type="text" /><br/>
                    <ErrorMessage name="name" />
                </Row>

                <Row>
                    <label>Номер телефона:</label><br />
                    <Field name="phoneNumber" type="text" /><br/>
                    <ErrorMessage name="phoneNumber" />
                </Row>

                <Row>
                    <label>E-mail:</label><br />
                    <Field name="email" type="text" /><br/>
                    <ErrorMessage name="email" />
                </Row>

                <Row>
                    <label>Пароль:</label><br />
                    <Field name="password" type="password" placeholder="Пароль" /><br/>
                    <ErrorMessage name="password" />
                </Row>

                <Row>
                    <label>Подтверждение пароля:</label><br />
                    <Field name="passwordConfirmation" type="password" placeholder="Подтверждение пароля" /><br/>
                    <ErrorMessage name="passwordConfirmation" />
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

export default ClientForm