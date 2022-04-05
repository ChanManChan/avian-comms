import React from 'react'

import './Link.css'

const Link = ({ text, onClick }) => {
    return <span className='genericLink' onClick={onClick}>{text}</span>
}

export default Link