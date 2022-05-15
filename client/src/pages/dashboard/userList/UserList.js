import React from 'react'
import { connect } from 'react-redux'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import { CHAT_TYPES, getActions } from '../../../store/actions/chat'
import './UserList.css'

const UserList = ({ directConversations = [], setChosenChatDetails, chosenChatDetails }) => {
    
    const setActiveConversation = (chatDetails, chatType) => {
        if (chosenChatDetails?.conversationId === chatDetails.conversationId) return
        setChosenChatDetails(chatDetails, chatType)
    }

    return (
        <section className='userListContainer'>
            {directConversations.map(({ _id: conversationId, participants: [{ username, isOnline }] }) => (
                <FlatButton key={conversationId} text={username} onClick={() => setActiveConversation({ username, conversationId }, CHAT_TYPES.DIRECT)}>
                    <TextAvatar text={username} secondary={isOnline}/>
                </FlatButton>
            ))}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.communication, ...state.chat })
const mapActionsToPros = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToPros)(UserList)