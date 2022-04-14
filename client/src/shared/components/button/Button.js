import React from 'react'

import './Button.css'

const Button = ({ text, onClick, disabled, disabledText, secondary = false, children, className = '' }) => {
    return (
        <button className={`genericButton${secondary ? ' secondary' : ''} ${className}`} onClick={onClick} disabled={disabled} data-disabledtext={disabledText}>
            {text}
            {children && <span style={{ marginLeft: '8px' }}>{children}</span>}
        </button>
    )
}

export default Button