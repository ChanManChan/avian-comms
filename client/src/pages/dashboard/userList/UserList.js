import React from 'react'
import { connect } from 'react-redux'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import { CHAT_TYPES, getActions } from '../../../store/actions/chat'
import './UserList.css'

const UserList = ({ users = [], setChosenChatDetails, chosenChatDetails }) => {

    const setActiveConversation = (chatDetails, chatType) => {
        if (chosenChatDetails?._id === chatDetails._id) return
        setChosenChatDetails(chatDetails, chatType)
    }

    return (
        <section className='userListContainer'>
            {users.map(({ _id, username, isOnline }) => (
                <FlatButton key={_id} text={username} onClick={() => setActiveConversation({ _id, username }, CHAT_TYPES.DIRECT)}>
                    <TextAvatar text={username} secondary={isOnline}/>
                </FlatButton>
            ))}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.users, ...state.chat })
const mapActionsToPros = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToPros)(UserList)