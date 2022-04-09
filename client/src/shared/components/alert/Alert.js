import React, { useEffect, useRef } from 'react'

import './Alert.css'

const Alert = ({ text = '', onClose, open = false }) => {
    const snackbarRef = useRef()
    const timerIdRef = useRef()

    useEffect(() => {
        clearTimeout(timerIdRef.current)
        timerIdRef.current = setTimeout(() => { 
            snackbarRef.current.classList.value = snackbarRef.current.classList.value.replace(' show', '')
            // snackbarRef.current.remove()
            onClose()
         }, 3000)
        return () => clearTimeout(timerIdRef.current)
    }, [onClose, open])

    return <div className={`snackbar${open ? ' show' : ''}`} ref={snackbarRef}>{text}</div>
}

export default Alert