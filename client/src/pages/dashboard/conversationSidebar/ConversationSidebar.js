import React, { useState } from 'react'

import Button from '../../../shared/components/button/Button'
import Modal from '../../../shared/components/modal/Modal'
import SendInvitationForm from '../sendInvitation/SendInvitationForm'
import UserList from '../userList/UserList'
import './ConversationSidebar.css'

const ConversationSidebar = () => {
    const [open, setOpen] = useState(false)
    
    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <aside className='conversationSidebarContainer'>
            <Button text='Add friend' secondary onClick={() => setOpen(true)} />
            <main className='userList'>
                <p className='sectionTitle'>PRIVATE MESSAGES</p>
                <UserList />
                <p className='sectionTitle'>INVITATIONS</p>
                <section></section>
            </main>
            <Modal open={open} onClose={handleCloseDialog}>
                <SendInvitationForm open={open} />
            </Modal>
        </aside>
    )
}

export default ConversationSidebar