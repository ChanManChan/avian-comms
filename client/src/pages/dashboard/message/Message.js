import React from 'react'

import Avatar from '../../../shared/components/avatar/Avatar'
import { imageFormats, videoFormats } from '../../../shared/utils'
import './Message.css'

const MediaContainer = ({ media = [], id }) => {
    return (
        <div className='mediaContainer'>
            {media.map(y => {
                const extension = y.split('.')[1]
                
                if (imageFormats.includes(extension)) {
                    return <img src={`http://localhost:8080/uploads/${id}/${y}`} key={y} alt="media" />
                }
                
                if (videoFormats.includes(extension)) {
                    return <video src={`http://localhost:8080/uploads/${id}/${y}`} key={y} controls />
                }

                return null
            })}
        </div>
    )
}

const Message = React.forwardRef(({ message : { content, author: { _id, username, profilePicture }, sameAuthor, createdAt, sameDay, media }}, ref) => {
    if (sameAuthor && sameDay) {
        return (
            <div className='messageContent chainMessageContainer'>
                {content && <span className='chainMessage'>{content}</span>}
                {media?.length > 0 && <MediaContainer media={media} id={_id} />}
            </div>
        )
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
                    <div className='messageContent'>
                        {content && <span>{content}</span>}
                        {media?.length > 0 && <MediaContainer media={media} id={_id} />}
                    </div>
                </div>
            </div>
        </>
    )
})

export default Message