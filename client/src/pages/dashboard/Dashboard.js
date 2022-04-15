import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import GroupSidebar from './groupSidebar/GroupSidebar'
import ConversationSidebar from './conversationSidebar/ConversationSidebar'
import MessageContainer from './messageContainer/MessageContainer'
import Appbar from './appbar/Appbar'
import { logout } from '../../shared/utils'
import { getActions } from '../../store/actions/auth'
import { connectWithSocketServer } from '../../realtimeCommunication/socketConnection'
import './Dashboard.css'

const DashboardPage = ({ setUserDetails }) => {
    console.count('Nandu')
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
                <MessageContainer />
            </section>
        </div>
    )
}

const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(null, mapActionsToProps)(DashboardPage)