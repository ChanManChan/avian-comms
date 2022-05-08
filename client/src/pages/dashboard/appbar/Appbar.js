import React from 'react'
import { connect } from 'react-redux'

import Button from '../../../shared/components/button/Button'
import { logout } from '../../../shared/utils'
import './Appbar.css'

const Appbar = ({ username, signedInUser }) => {
    return (
        <header className='appbarContainer'>
            <span>{username ? `Chosen coversation: ${username}`: `Signed-in as ${signedInUser}`}</span>
            <Button text="Logout" className='logoutBtn' onClick={logout}>
                <i className='fa-solid fa-arrow-right-from-bracket'></i>
            </Button>
        </header>
    )
}

const mapStateToProps = state => ({ 
    username: state.chat.chosenChatDetails?.username, 
    signedInUser: state.auth.userDetails?.username
})

export default connect(mapStateToProps)(Appbar)