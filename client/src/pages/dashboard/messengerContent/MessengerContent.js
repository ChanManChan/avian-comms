import React, { useEffect } from "react"
import { connect } from 'react-redux'

import { getActions } from "../../../store/actions/chat"
import Message from "../message/Message"
import MessageComponse from '../messageCompose/MessageCompose'
import "./MessengerContent.css"

const MessengerContent = ({ chosenChatDetails, getChosenChatHistory, userDetails, messages }) => {

  useEffect(() => {
    getChosenChatHistory({ 
      senderId: userDetails._id, 
      receiverId: chosenChatDetails._id, 
      pageSize: 20, 
      pageNumber: 0 
    })
  }, [chosenChatDetails])

  return (
    <section className="messengerContent">
      <div className="messagesContainer">
        <div className="messengerHeader">
          <p>
            This is the beginning of your conversation with{" "}
            {chosenChatDetails.username}
          </p>
        </div>
        {messages.map((message) => <Message message={message} key={message._id} />)}
      </div>
      <MessageComponse />
    </section>
  )
}

const mapStateToProps = state => ({ ...state.auth, ...state.chat })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(MessengerContent)