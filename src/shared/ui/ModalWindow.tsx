import React, { ReactNode, useEffect, useRef } from "react"
import './modal-window.scss'

export interface ModalWindowProps {
    display: boolean
    name?: string
    children?: ReactNode
    onClose?: () => void
}

const ModalWindow: React.FC<ModalWindowProps> = ({ display, name, children, onClose }) => {

    const classList: string[] = ['modal']

    display && classList.push('active')

    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let handleOusideClick = (e: MouseEvent) => {
            if ( modalRef.current === e.target ) {
                onClose && onClose()
            }
        }
        document.addEventListener('click', handleOusideClick)
        return () => {
            document.removeEventListener('click', handleOusideClick)
        }
    }, [modalRef])

    return (
        <div className={classList.join(' ')} ref={ modalRef } >
            <div className="modal-window">
                <div className="modal-window-header row">
                    <h2>{name}</h2>
                    <button onClick={onClose}>close</button>
                </div>
                <div className="modal-window-body">
                    {children}
                </div>
                <div className="modal-window-footer row">
                </div>
            </div>
        </div>
    )
}

export default ModalWindow