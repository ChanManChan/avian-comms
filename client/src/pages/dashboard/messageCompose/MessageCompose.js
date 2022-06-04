import React, { useState } from 'react'
import { connect } from 'react-redux'

import { sendMessage } from '../../../realtimeCommunication/socketConnection'
import Button from '../../../shared/components/button/Button'
import Input from "../../../shared/components/input/Input"
import './MessageCompose.css'

const MessageCompose = ({ chosenChatDetails }) => {
    const [message, setMessage] = useState('')
    const [file, setFile] = useState(null)

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

    const handleAttachment = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.onchange = e => {
            const file = e.target.files[0]
            if (file.type.startsWith('image') || file.type.startsWith('video')) {
                setFile(file)
            } else {
                setFile(null)
            }
        }
        input.click()
    }

    return (
        <div className="messageComposeContainer">
            <Input
             autoFocus
             value={message} 
             onChange={setMessage} 
             placeholder={`Write message to ${chosenChatDetails.username}`}
             handleKeyDown={handleKeyDown} />
             <Button onClick={handleAttachment}>
                <i className="fa-solid fa-paperclip"></i>
             </Button>
             <Button onClick={handleSendMessage}>
                <i className="fa-solid fa-paper-plane"></i>
             </Button>
        </div>
    )
}

const mapStateToProps = store => ({ ...store.chat })

export default connect(mapStateToProps, null)(MessageCompose)