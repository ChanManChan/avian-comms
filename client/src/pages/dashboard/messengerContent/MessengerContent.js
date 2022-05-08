import React from "react"
import { connect } from 'react-redux'

import MessageComponse from '../messageCompose/MessageCompose'
import Messages from "../messages/Messages"
import "./MessengerContent.css"

const MessengerContent = ({ chosenChatDetails, messages }) => {
  return (
    <main className='messageContainer'>
      {!chosenChatDetails ? (
          <div className='welcomeMessage'>
              <p>To start chatting - choose conversation</p>
          </div>
      ) : (
        <section className="messengerContent">
          <div className="messagesContainer">
            <div className="messengerHeader">
              <p>
                This is the beginning of your conversation with{" "}
                {chosenChatDetails.username}
              </p>
            </div>
            <Messages messages={messages} />
            <div ref={ele => ele?.scrollIntoView()} />
          </div>
          <MessageComponse />
        </section>
      )}
    </main>
  )
}

const mapStateToProps = state => ({ ...state.chat })

export default connect(mapStateToProps)(MessengerContent)