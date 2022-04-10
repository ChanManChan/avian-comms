import React from 'react'

import Unfocus from '../unfocus/Unfocus'
import './Modal.css'

const Modal = ({ open = false, onClose, children }) => {
    return (
        <>
            <Unfocus onClick={onClose}>
                <div className={`modalFrame${open ? ' stateAppear' : ' stateLeave'}`}>
                    <button onClick={onClose} className='modalCloseBtn'><i className='fa-solid fa-xmark'></i></button>
                    {children}
                </div>
            </Unfocus>
            <div className={`modalOverlay${open ? ' stateAppear' : ' stateLeave'}`}></div>
        </>
    )
}

export default Modal