import React from 'react'

import GroupSidebar from './groupSidebar/GroupSidebar'
import ConversationSidebar from './conversationSidebar/ConversationSidebar'
import MessageContainer from './messageContainer/MessageContainer'
import Appbar from './appbar/Appbar'
import './Dashboard.css'

const DashboardPage = () => {
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

export default DashboardPage