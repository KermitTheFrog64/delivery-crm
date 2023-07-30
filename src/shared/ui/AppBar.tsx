import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks/redux"
import { getAccessToken, getUser, logOut } from "../../app/app-slice"
import ModalMenu, { ModalMenuItem } from "./ModalMenu"

interface AppBarProps {
    name: string
}

const AppBar: React.FC<AppBarProps> = ({ name }) => {
    
    const user = useAppSelector(getUser)
    
    const access_token = useAppSelector(getAccessToken)

    const dispatch = useAppDispatch()

    const onLogOutClick = () => {
        dispatch(logOut())
        navigate('/')
    }

    useEffect( () => {
        if ( user && !access_token ) {
            navigate('/')
        }
    }, [ access_token ] )

    const navigate = useNavigate()

    const onLogInClick = () => {
        navigate("/login")
    }

    const onSignUpClick = () => {
        navigate("/signup")
    }

    const items: ModalMenuItem[] = []

    user?.role?.type === 'admin' && items.push(
        { label: 'Заказы', to: '/admin' },
        { label: 'Сотрудники', to: '/admin/employees' }
    )

    user?.role?.type === 'client' && items.push(
        { label: 'Заказы', to: '/client' },
        { label: 'Учётные данные', to: '/client/personalinfo' }
    )

    return (
        <div className="app-bar">

            <div className="app-bar-title">{name}</div>

            <div className="flex align-center gap-30">

                {!!items.length && <ModalMenu
                    label={user?.name}
                    items={items}
                    labelClassList="app-bar-link"
                />}

                {user && <div className="app-bar-link" onClick={onLogOutClick} >Выйти</div>}

                {!user && !access_token &&
                    <>
                        <div className="app-bar-link" onClick={onLogInClick} >Вход</div>
                        <div className="app-bar-link" onClick={onSignUpClick} >Регистрация</div>
                    </>
                }

            </div>

        </div>
    )
    
}

export default AppBar