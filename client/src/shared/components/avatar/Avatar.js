import React from 'react'

import TextAvatar from '../textAvatar/TextAvatar'
import PictureAvatar from '../pictureAvatar/PictureAvatar'

const Avatar = ({ content = '', secondary = false, tertiary = false }) => {
    return /^https?:\/\//.test(content) ? (
        <PictureAvatar url={content} alt="profile-picture" secondary={secondary} tertiary={tertiary} />
    ) : (
        <TextAvatar text={content} secondary={secondary} />
    )
}

export default Avatar