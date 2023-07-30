import React from "react"

import { Link } from "react-router-dom"

import "./modal-menu.scss"


export interface ModalMenuItem {
    label: string
    to: string
}

interface ModalMenuProps {
    label?: string
    items: ModalMenuItem[]
    labelClassList?: string
}

const ModalMenu: React.FC<ModalMenuProps> = ({ label, items, labelClassList }) => {

    const classList: string[] = ['label']
    labelClassList && classList.push(labelClassList)

    return (
        <div className="menu-container">
            <div className={classList.join(' ')}>{label}</div>
            <div className="menu">
                {items.map(({ label, to }, key) => <Link to={to} key={key}>{label}</Link>)}
            </div>
        </div>
    )
}

export default ModalMenu