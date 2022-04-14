import React from 'react'

import './TextAvatar.css'

const TextAvatar = ({ text = '' }) => {
    return <div className='textAvatarWrapper'>{text.substring(0, 2)}</div>
}

export default TextAvatar