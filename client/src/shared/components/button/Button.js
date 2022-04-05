import React from 'react'

import './Button.css'

const Button = ({ text, onClick, disabled, disabledText }) => {
    return (
        <button className='genericButton' onClick={onClick} disabled={disabled} data-disabledtext={disabledText}>
            {text}
        </button>
    )
}

export default Button