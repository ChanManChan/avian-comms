import React, { useState } from 'react'
import { connect } from 'react-redux'

import Button from '../../../shared/components/button/Button'
import Modal from '../../../shared/components/modal/Modal'
import SendInvitationForm from '../sendInvitation/SendInvitationForm'
import UserList from '../userList/UserList'
import InvitationList from '../invitationList/InvitationList'
import { CHAT_TYPES } from '../../../store/actions/chat'
import SendGroupInvitationForm from '../sendGroupInvitation/SendGroupInvitationForm'
import './ConversationSidebar.css'

const ConversationSidebar = ({ chatType }) => {
    const [open, setOpen] = useState(false)
    
    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <aside className='conversationSidebarContainer'>
            <Button text={chatType === CHAT_TYPES.GROUP ? 'Create Group' : 'Add friend'} secondary onClick={() => setOpen(true)} />
            <main className='userList'>
                <p className='sectionTitle'>{chatType === CHAT_TYPES.GROUP ? 'GROUP' : 'PRIVATE'} MESSAGES</p>
                <UserList />
                <p className='sectionTitle'>INVITATIONS</p>
                <InvitationList />
            </main>
            <Modal open={open} onClose={handleCloseDialog}>
                {chatType === CHAT_TYPES.GROUP ? 
                    <SendGroupInvitationForm open={open} onClose={handleCloseDialog} /> : 
                    <SendInvitationForm open={open} onClose={handleCloseDialog} />}
            </Modal>
        </aside>
    )
}

const mapStateToProps = state => ({ chatType: state.chat.chatType })

export default connect(mapStateToProps)(ConversationSidebar)