import React, { useState } from 'react'

import Button from '../../../shared/components/button/Button'
import Modal from '../../../shared/components/modal/Modal'
import './ConversationSidebar.css'

const ConversationSidebar = () => {
    const [open, setOpen] = useState(false)

    return (
        <aside className='conversationSidebarContainer'>
            <Button text='Add friend' secondary onClick={() => setOpen(true)} />
            <main className='userList'>
                <p className='sectionTitle'>PRIVATE MESSAGES</p>
                <section></section>
                <p className='sectionTitle'>INVITATIONS</p>
                <section></section>
            </main>
            <Modal open={open} onClose={() => setOpen(false)}>
                
            </Modal>
        </aside>
    )
}

export default ConversationSidebar