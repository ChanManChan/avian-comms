import React from 'react'

import Avatar from '../../../shared/components/avatar/Avatar'
import './Message.css'

const Message = React.forwardRef(({ message : { content, author: { _id, username, profilePicture }, sameAuthor, createdAt, sameDay }}, ref) => {
    if (sameAuthor && sameDay) {
        return <span className='chainMessage'>{content}</span>
    }

    return (
        <>
            {!sameDay && (
                <div className='dayDivider'>
                    <hr />
                    {createdAt}
                    <hr />
                </div>
            )}
            <div className='initialMessageWrapper' ref={ref}>
                <Avatar content={(!profilePicture || profilePicture.includes('default.png')) ? username : `http://localhost:8080/uploads/${_id}/${profilePicture}`} tertiary />
                <div className='initialMessage'>
                    <p><strong>{username}</strong></p>
                    <span>{content}</span>
                </div>
            </div>
        </>
    )
})

export default Message