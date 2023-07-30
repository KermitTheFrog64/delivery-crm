import React from "react"
import { DefaultLayout } from "../shared"

import "./home.scss"

const Home: React.FC = () => {
    return (
        <DefaultLayout>
            <div className="background-image-container">
                <div className="background-image"></div>
            </div>
        </DefaultLayout>
    )
}

export default Home