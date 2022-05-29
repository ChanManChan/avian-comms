import React, { useState } from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../../../realtimeCommunication/socketConnection'
import Input from "../../../shared/components/input/Input"
import './MessageCompose.css'

const MessageCompose = ({ chosenChatDetails }) => {
    const [message, setMessage] = useState('')

    const handleSendMessage = () => {
        if (message.trim().length > 0) {
            sendMessage({ conversationId: chosenChatDetails.conversationId, content: message.trim() })
            setMessage('')
        }
    }

    const handleKeyDown = event => {
        if (event.key === "Enter") {
            handleSendMessage()
        }
    }

    return (
        <div className="messageComposeContainer">
            <Input
             autoFocus
             value={message} 
             onChange={setMessage} 
             placeholder={`Write message to ${chosenChatDetails.username}`}
             handleKeyDown={handleKeyDown} />
        </div>
    )
}

const mapStateToProps = store => ({ ...store.chat })

export default connect(mapStateToProps, null)(MessageCompose)