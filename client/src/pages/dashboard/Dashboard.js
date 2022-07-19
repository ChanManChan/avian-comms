import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import GroupSidebar from './groupSidebar/GroupSidebar'
import ConversationSidebar from './conversationSidebar/ConversationSidebar'
import Appbar from './appbar/Appbar'
import {commaSeparatedWithAnd, logout} from '../../shared/utils'
import { getActions } from '../../store/actions/auth'
import { getActions as getRoomActions } from '../../store/actions/room'
import {CHAT_TYPES, getActions as getChatActions} from '../../store/actions/chat'
import { connectWithSocketServer } from '../../realtimeCommunication/socketConnection'
import MessengerContent from './messengerContent/MessengerContent'
import Room from "./room/Room";
import { ROOM_ACTIONS } from "../../store/actions/room";
import { DEFAULT_ROOM_DETAILS } from "../../store/reducers/room"
import Button from "../../shared/components/button/Button";
import './Dashboard.css'

const DashboardPage = ({
    setUserDetails,
    currentRoom,
    setCurrentRoom,
    incomingCall,
    handleIncomingCall,
    directConversations,
    groupConversations,
    setChosenChatDetails
}) => {

    useEffect(() => {
        const userDetails = localStorage.getItem('user')
        if (!userDetails) {
            logout()
        } else {
            const user = JSON.parse(userDetails)
            setUserDetails(user)
            connectWithSocketServer(user)
        }
    }, [setUserDetails])

    const handleAcceptIncomingCall = () => {
        handleIncomingCall()
        setCurrentRoom({ ...DEFAULT_ROOM_DETAILS, roomDetails: incomingCall.roomDetails })

        const roomId = incomingCall.roomDetails.roomId
        const conversations = directConversations.concat(groupConversations)
        const conversation = conversations.find(({ _id }) => _id === roomId)

        const isGroupConversation = conversation.isGroupConversation
        const chatDetails = {
            conversationId: conversation._id
        }
        Object.assign(chatDetails, isGroupConversation ? {
            groupName: commaSeparatedWithAnd(conversation.participants.map(({ username }) => username).join(', '))
        } : {
            username: conversation.participants[0].username
        })

        setChosenChatDetails(chatDetails, isGroupConversation ? CHAT_TYPES.GROUP : CHAT_TYPES.DIRECT)
    }

    return (
        <div className='dashboardContainer'>
            <GroupSidebar />
            <ConversationSidebar />
            <section className='chatContainer'>
                <Appbar />
                <MessengerContent />
            </section>
            {currentRoom && <Room />}
            {incomingCall.incomingCallStatus === ROOM_ACTIONS.CALL_AWAITING_ACTION && (
                <div className='callActionWindow'>
                    <audio src="/call_effect.mp3" loop autoPlay style={{ display: "none" }}/>
                    <h4>Incoming call from {incomingCall.roomDetails.roomCreator.username}</h4>
                    <Button text='Accept' className='acceptButton' onClick={handleAcceptIncomingCall} />
                    <Button text='Reject' onClick={handleIncomingCall} />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({ ...state.room, ...state.communication })

const mapActionsToProps = dispatch => ({ ...getActions(dispatch), ...getRoomActions(dispatch), ...getChatActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(DashboardPage)