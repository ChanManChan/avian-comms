import React from 'react'

import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './Message.css'

const Message = ({ message : { content, author: { username }, sameAuthor, date, sameDay }}) => {
    if (sameAuthor && sameDay) {
        return <span className='chainMessage'>{content}</span>
    }

    return (
        <div className='initialMessageWrapper'>
            <TextAvatar text={username} />
            <div className='initialMessage'>
                <p>{username} <small>{date}</small></p>
                <span>{content}</span>
            </div>
        </div>
    )
}

export default Message