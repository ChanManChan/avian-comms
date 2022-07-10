import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../shared/components/button/Button'
import { logout } from '../../../shared/utils'
import './Appbar.css'

const Appbar = ({ username, groupName, signedInUser }) => {
    return (
        <header className='appbarContainer'>
            <span className='chosenConversationName'>
                {(username || groupName) && <>Chosen conversation: <strong>{username ?? groupName}</strong></>}
            </span>
            <div className='appbarAside'>
                <span className='signedInUsername'>Signed-in as <strong>{signedInUser}</strong></span>
                <Button text="Logout" className='logoutBtn' onClick={logout}>
                    <i className='fa-solid fa-arrow-right-from-bracket'></i>
                </Button>
            </div>
        </header>
    )
}

const mapStateToProps = state => ({ 
    username: state.chat.chosenChatDetails?.username, 
    groupName: state.chat.chosenChatDetails?.groupName,
    signedInUser: state.auth.userDetails?.username
})

export default connect(mapStateToProps)(Appbar)