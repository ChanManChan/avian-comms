import React, { useRef } from 'react'

import './Input.css'
import { generateUUID } from '../../utils'

const Input = ({ type = 'text', placeholder = 'Enter the value here', label = '', onChange, value = '' }) => {
    const id = useRef(generateUUID(10))

    return (
        <div className='inputWrapper'>
            {label !== '' && <label htmlFor={id.current}>{label}</label>}
            <br />
            <input id={id.current} type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} />
        </div>
    )
}

export default Input