import React from 'react'

import './Button.css'

const Button = ({ text, onClick, disabled, disabledText, secondary = false }) => {
    return (
        <button className={`genericButton${secondary ? ' secondary' : ''}`} onClick={onClick} disabled={disabled} data-disabledtext={disabledText}>
            {text}
        </button>
    )
}

export default Button