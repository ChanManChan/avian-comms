import React from 'react'

import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './Message.css'

const Message = ({ message : { content, author: { username }, sameAuthor, date, sameDay }}) => {
    return (
        <div className='messageChainWrapper'>
            <TextAvatar text={username} />
            <div className='messageChain'>
                <p>{username} <small>{date}</small></p>
                <span>{content}</span>
            </div>
        </div>
    )
}

export default Message