import React from 'react'

import './FlatButton.css'

const FlatButton = ({ text, onClick, disabled, secondary = false, children }) => {
    return (
        <button className={`flatButton${secondary ? ' secondary' : ''}`} onClick={onClick} disabled={disabled}>
            {children && <span>{children}</span>}
            <span>{text}</span>
        </button>
    )
}

export default FlatButton