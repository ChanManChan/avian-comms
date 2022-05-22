import React from 'react'

import './Chip.css'

const Chip = ({ handleClose, handleClick, text }) => {
    return (
        <div className='chipButton' onClick={handleClick}>
            {text}
            <button className='chipCloseButton' onClick={handleClose}>
                <i className='fa-solid fa-xmark'></i>
            </button>
        </div>
    )
}

export default Chip