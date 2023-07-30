import { ReactNode } from "react"
import { AppBar } from "../"

interface DefaultLayoutProps {
    children: ReactNode
    center?: boolean
}

import './layout.scss'

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children, center }) => {
    const classList = [ 'layout' ]
    center && classList.push( 'layout-center' )
    return (
        <div className={ classList.join( ' ' ) }>
            <AppBar name="QuickDelivery" />
            <div className="layout-content">
                {children}
            </div>
        </div>
    )
}

export default DefaultLayout