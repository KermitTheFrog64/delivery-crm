import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"

import { useAppDispatch, useAppSelector } from "../../shared/hooks/redux"

import { getUser, logIn } from "../../app/app-slice"

import { ErrorMessage, Field, Formik, Form } from "formik"
import * as Yup from "yup"

import { Row } from "../../shared/ui"
import { LogInPayload } from "../../shared/utils/api"

const LogIn: React.FC = () => {

    const dispatch = useAppDispatch()

    const user = useAppSelector(getUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (user?.role) {
            navigate(`/${user.role.type}`)
        }
    }, [user])

    const initialValues: LogInPayload = {
        email: '',
        password: ''
    }

    const onSubmit = (values: LogInPayload) => {
        dispatch(logIn(values))
    }

    return (
        <div className="block row">
            <Formik
                initialValues={initialValues}
                validationSchema={Yup.object({
                    email: Yup.string().required('Это поле обязательно'),
                    password: Yup.string().required('Это поле обязательно'),
                })}
                onSubmit={onSubmit}
            >
                <Form>

                    <Row>
                        <Field name="email" type="text" placeholder="E-mail" />
                        <br/>
                        <ErrorMessage name="email" />
                    </Row>

                    <Row>
                        <Field name="password" type="password" placeholder="Пароль" />
                        <br/>
                        <ErrorMessage name="password" />
                    </Row>

                    <Row>
                        <button type="submit" className="authorization-button" >
                            Войти
                        </button>
                    </Row>

                </Form>
            </Formik>
        </div>
    )
}

export default LogIn