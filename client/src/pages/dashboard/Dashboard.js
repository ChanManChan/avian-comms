import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import GroupSidebar from './groupSidebar/GroupSidebar'
import ConversationSidebar from './conversationSidebar/ConversationSidebar'
import Appbar from './appbar/Appbar'
import { logout } from '../../shared/utils'
import { getActions } from '../../store/actions/auth'
import { connectWithSocketServer } from '../../realtimeCommunication/socketConnection'
import MessengerContent from './messengerContent/MessengerContent'
import Room from "./room/Room";
import { ROOM_ACTIONS } from "../../store/actions/room";
import Button from "../../shared/components/button/Button";
import './Dashboard.css'

const DashboardPage = ({ setUserDetails, isUserInRoom, incomingCallStatus, roomDetails }) => {

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

    return (
        <div className='dashboardContainer'>
            <GroupSidebar />
            <ConversationSidebar />
            <section className='chatContainer'>
                <Appbar />
                <MessengerContent />
            </section>
            {isUserInRoom && <Room />}
            {incomingCallStatus === ROOM_ACTIONS.CALL_AWAITING_ACTION && (
                <div className='callActionWindow'>
                    <h4>Incoming call from {roomDetails.roomCreator.username}</h4>
                    <Button text='Accept' className='acceptButton' />
                    <Button text='Reject' />
                </div>
            )}
        </div>
    )
}

const mapStateToProps = state => ({ ...state.room })

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(DashboardPage)