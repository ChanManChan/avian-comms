import React from 'react'

import Call from "../call/Call"
import './CallsContainer.css'

const CallsContainer = () => {
    return (
        <div className="callsContainer">
            <Call />
            <Call />
            <Call />
        </div>
    )
}

export default CallsContainer