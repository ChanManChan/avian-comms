import React from 'react'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './UserList.css'

const UserList = () => {
    const DUMMY_FRIENDS = [
        {
            id: 1,
            username: 'nanda Gopal',
            isOnline: true
        },
        {
            id: 2,
            username: 'uber Sama',
            isOnline: true
        },
        {
            id: 3,
            username: 'chan Chan Man',
            isOnline: false
        }
    ]
    
    return (
        <section className='userListContainer'>
            {DUMMY_FRIENDS.map(({ id, username, isOnline }) => (
                <FlatButton key={id} text={username}>
                    <TextAvatar text={username}/>
                </FlatButton>
            ))}
        </section>
    )
}

export default UserList