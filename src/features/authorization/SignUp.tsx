import { ErrorMessage, Field, Form, Formik } from "formik"
import React from "react"
import * as Yup from "yup"
import YupPassword from 'yup-password'
YupPassword(Yup) // extends yup
import { useAppDispatch } from "../../shared/hooks/redux"
import { fetchCurrentUser, signUp } from "../../app/app-slice"
import { Row } from "../../shared/ui"
import { SignUpPayload } from "../../shared/utils/api"

const SignUp: React.FC = () => {

    let email_regx = /^(([^<>()\[\]\\.,;:\s@"]+(.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/

    const dispatch = useAppDispatch()

    const initialValues: SignUpPayload = {
        name: '',
        phoneNumber: '',
        email: '',
        password: '',
        passwordConfirmation: ''
    }

    const onSubmit = (values: SignUpPayload) => {
        dispatch(signUp(values))
    }

    return (
        <div className="block row">
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
                        .minLowercase(1, 'Пароль должен содержать по крайней мере 1 букву в нижнем регистре')
                        .minUppercase(1, 'Пароль должен содержать по крайней мере 1 букву в верхнем регистре')
                        .minNumbers(1, 'Пароль должен содержать по крайней мере 1 цифру')
                        .minSymbols(1, 'Пароль должен содержать по крайней мере 1 сивол')
                        .required('Это поле обязательно'),
                    passwordConfirmation: Yup.string()
                        .oneOf([Yup.ref('password')], 'Пароли не совпадают')
                })}
                onSubmit={onSubmit}
            >
                <Form>

                    <Row>
                        <Field name="name" type="text" placeholder="Имя" />
                        <ErrorMessage name="name" />
                    </Row>

                    <Row>
                        <Field name="phoneNumber" type="text" placeholder="Номер телефона" />
                        <ErrorMessage name="phoneNumber" />
                    </Row>

                    <Row>
                        <Field name="email" type="text" placeholder="E-mail" />
                        <ErrorMessage name="email" />
                    </Row>

                    <Row>
                        <Field name="password" type="password" placeholder="Пароль" />
                        <ErrorMessage name="password" />
                    </Row>

                    <Row>
                        <Field name="passwordConfirmation" type="password" placeholder="Подтверждение пароля" />
                        <ErrorMessage name="passwordConfirmation" />
                    </Row>

                    <Row>
                        <button type="submit" className="authorization-button" >
                            Зарегестрироваться
                        </button>
                    </Row>

                </Form>
            </Formik>
        </div>
    )
}

export default SignUp