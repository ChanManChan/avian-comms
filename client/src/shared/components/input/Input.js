import React, { useRef } from 'react'

import { generateUUID } from '../../utils'
import './Input.css'

const Input = ({ 
    type = 'text', 
    placeholder = 'Enter the value here', 
    label = '', 
    onChange, 
    value = '', 
    handleKeyDown, 
    autoFocus = false
 }) => {
    const id = useRef(generateUUID(10))

    return (
        <div className='inputWrapper'>
            {label !== '' && <label htmlFor={id.current}>{label}</label>}
            <br />
            <input
             autoFocus={autoFocus}
             id={id.current}
             type={type} 
             placeholder={placeholder} 
             value={value} 
             onChange={e => onChange(e.target.value)}
             onKeyDown={handleKeyDown} />
        </div>
    )
}

export default Input