import React from 'react'

import './TextAvatar.css'

const TextAvatar = ({ text = '', secondary = false }) => {
    return <div className={`textAvatarWrapper${secondary ? ' secondary' : ''}`}>{text.substring(0, 2)}</div>
}

export default TextAvatar