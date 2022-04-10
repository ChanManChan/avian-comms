import React, { cloneElement, useEffect, useRef } from 'react'

const Unfocus = ({ children, onClick }) => {
    const ref = useRef()

    useEffect(() => {
        if (!ref?.current) {
            return
        }

        const handleOutsideClick = e => {
            if (onClick && !ref.current.contains(e.target)) {
                onClick(e)
            }
        }

        document.addEventListener('mousedown', handleOutsideClick)
        return () => document.removeEventListener('mousedown', handleOutsideClick)
    }, [onClick])

    return <>{cloneElement(children, { ref })}</>
}

export default Unfocus