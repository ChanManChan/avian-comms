import React, {useEffect} from 'react'

import { Container } from './Container'
import './ConferenceContainer.css'

const ConferenceContainer = () => {

    useEffect(() => {
        initialize()
    }, [])

    const initialize = () => {
        const container = document.getElementsByClassName("conferenceContainer")[0]

        const dish = new Container(container)
        dish.append()
        dish.resize()

        window.addEventListener("resize", () => {
            dish.resize()
        })
    }

    return (
        <div className="conferenceContainer">
        </div>
    )
}

export default ConferenceContainer