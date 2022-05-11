import React from "react"
import { connect } from 'react-redux'
import { getActions } from "../../../store/actions/chat"

import MessageComponse from '../messageCompose/MessageCompose'
import Messages from "../messages/Messages"
import "./MessengerContent.css"

const MessengerContent = ({ chosenChatDetails, messages, removeLiveTag }) => {
  return (
    <main className='messageContainer'>
      {!chosenChatDetails ? (
          <div className='welcomeMessage'>
              <p>To start chatting - choose conversation</p>
          </div>
      ) : (
        <section className="messengerContent">
          <div className="messagesContainer" onScroll={() => {
            if (messages.at(-1)?.live) {
              removeLiveTag()
            }
          }}>
            <div className="messengerHeader">
              <p>
                This is the beginning of your conversation with{" "}
                {chosenChatDetails.username}
              </p>
            </div>
            <Messages messages={messages} />
            <div ref={ele => messages.at(-1)?.live ? ele?.scrollIntoView() : messages.length <= 20 && ele?.scrollIntoView()} />
          </div>
          <MessageComponse />
        </section>
      )}
    </main>
  )
}

const mapStateToProps = state => ({ ...state.chat })
const mapActionsToProps = dispatch => ({ ...getActions(dispatch) })

export default connect(mapStateToProps, mapActionsToProps)(MessengerContent)