import React from 'react'
import { connect } from 'react-redux'

import FlatButton from '../../../shared/components/flatButton/FlatButton'
import Avatar from '../../../shared/components/avatar/Avatar'
import TextAvatar from '../../../shared/components/textAvatar/TextAvatar'
import { commaSeparatedWithAnd } from '../../../shared/utils'
import { CHAT_TYPES, getActions } from '../../../store/actions/chat'
import './UserList.css'

const UserList = ({ directConversations = [], groupConversations = [], setChosenChatDetails, chosenChatDetails, chatType }) => {
    
    const setActiveConversation = (chatDetails, chatType) => {
        if (chosenChatDetails?.conversationId === chatDetails.conversationId) return
        setChosenChatDetails(chatDetails, chatType)
    }

    return (
        <section className='userListContainer'>
            {chatType === CHAT_TYPES.DIRECT ? (
                directConversations.map(({ _id: conversationId, participants: [{ username, isOnline, profilePicture, _id }] }) => (
                    <FlatButton key={conversationId} text={username} onClick={() => setActiveConversation({ username, conversationId }, CHAT_TYPES.DIRECT)}>
                        <Avatar 
                         content={(!profilePicture || profilePicture.includes('default.png')) ? username : `http://localhost:8080/uploads/${_id}/${profilePicture}`} 
                         secondary={isOnline} />
                    </FlatButton>
                ))
            ) : (
                groupConversations.map(({ _id: conversationId, conversationName, participants }) => {
                    const groupName = commaSeparatedWithAnd(participants.map(({ username }) => username).join(', '))
                    return (
                        <FlatButton key={conversationId} text={conversationName ?? groupName} onClick={() => setActiveConversation({ groupName, conversationId }, CHAT_TYPES.GROUP)}>
                            <TextAvatar text={conversationName ?? groupName} />
                        </FlatButton>
                    )
                })
            )}
        </section>
    )
}

const mapStateToProps = state => ({ ...state.communication, ...state.chat })
const mapActionsToPros = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToPros)(UserList)