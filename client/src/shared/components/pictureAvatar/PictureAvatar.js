import React from 'react'

import './PictureAvatar.css'

const PictureAvatar = ({ url = '', alt = '', secondary = false, tertiary = false }) => {
    return (
        <div className={`pictureAvatarWrapper${secondary ? ' secondary' : tertiary ? ' tertiary' : ''}`}>
            <img src={url} alt={alt} />
        </div>
    )
}

export default PictureAvatar