import React, { useEffect } from "react";

import Message from "../message/Message";
import "./MessengerContent.css";

const MessengerContent = ({ chosenChatDetails }) => {
  const DUMMY_MESSAGES = [
    {
      _id: 1,
      content: "hello",
      sameAuthor: "false",
      author: {
        username: "Marek",
      },
      date: "22/01/2022",
      sameDay: false,
    },
    {
      _id: 2,
      content: "hello once again",
      sameAuthor: "true",
      author: {
        username: "Marek",
      },
      date: "22/01/2022",
      sameDay: true,
    },
    {
      _id: 3,
      content: "hello third time",
      sameAuthor: "true",
      author: {
        username: "Marek",
      },
      date: "23/01/2022",
      sameDay: false,
    },
    {
      _id: 4,
      content: "hello response first time",
      sameAuthor: false,
      author: {
        username: "John",
      },
      date: "23/01/2022",
      sameDay: true,
    },
    {
      _id: 5,
      content: "hello response third time",
      sameAuthor: true,
      author: {
        username: "John",
      },
      date: "24/01/2022",
      sameDay: false,
    },
  ]

  useEffect(() => {}, [chosenChatDetails])

  return (
    <section className="messengerContent">
      <div className="messengerHeader">
        <p>
          This is the beginning of your conversation with{" "}
          {chosenChatDetails.username}
        </p>
        {DUMMY_MESSAGES.map((message) => (
          <Message message={message} key={message._id} />
        ))}
      </div>
    </section>
  )
}

export default MessengerContent