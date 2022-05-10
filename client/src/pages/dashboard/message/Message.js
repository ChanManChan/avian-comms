import React from 'react'

import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import { dateFormatter } from '../../../shared/utils'
import './Message.css'

const Message = React.forwardRef(({ message : { content, author: { username }, sameAuthor, date, sameDay }}, ref) => {
    if (sameAuthor && sameDay) {
        return <span className='chainMessage'>{content}</span>
    }

    return (
        <>
            {!sameDay && (
                <div className='dayDivider'>
                    <hr />
                    {dateFormatter(date)}
                    <hr />
                </div>
            )}
            <div className='initialMessageWrapper' ref={ref}>
                <TextAvatar text={username} />
                <div className='initialMessage'>
                    <p><strong>{username}</strong></p>
                    <span>{content}</span>
                </div>
            </div>
        </>
    )
})

export default Message