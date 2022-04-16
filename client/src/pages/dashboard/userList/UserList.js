import React from 'react'
import { connect } from 'react-redux'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import './UserList.css'

const UserList = ({ users = [] }) => {
    return (
        <section className='userListContainer'>
            {users.map(({ _id, username, isOnline }) => (
                <FlatButton key={_id} text={username}>
                    <TextAvatar text={username} secondary={isOnline}/>
                </FlatButton>
            ))}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.users })

export default connect(mapStateToProps, null)(UserList)