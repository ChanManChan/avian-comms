import React from 'react'

import './FlatButton.css'

const FlatButton = ({ text, onClick, disabled, secondary = false, children = [] }) => {
    return (
        <button className={`flatButton${secondary ? ' secondary' : ''}`} onClick={onClick} disabled={disabled}>
            {!Array.isArray(children) ? <span>{children}</span> : <span>{children[0]}</span>}
            <span title={text} className='btnText'>{text}</span>
            {children[1] && <div className='additionalOperations'>{children[1]}</div>}
        </button>
    )
}

export default FlatButton