import React from 'react'
import { connect } from 'react-redux'

import MessengerContent from '../messengerContent/MessengerContent'
import './MessageContainer.css'

const MessageContainer = ({ chosenChatDetails }) => {
    return (
        <main className='messageContainer'>
            {!chosenChatDetails ? (
                <div className='welcomeMessage'>
                    <p>To start chatting - choose conversation</p>
                </div>
            ) : (
                <MessengerContent chosenChatDetails={chosenChatDetails} />
            )}
        </main>
    )
}

const mapStateToProps = state => ({ ...state.chat })

export default connect(mapStateToProps)(MessageContainer)