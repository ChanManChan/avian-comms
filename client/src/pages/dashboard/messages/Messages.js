import React, { useCallback, useRef } from 'react'

import Message from "../message/Message"
import useChatFetch from "../../../hooks/useChatFetch"

const Messages = ({ messages }) => {
    const observer = useRef()
    const { loading, more, setPageNumber } = useChatFetch()
    
    const lastMessageRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && more) {
            setPageNumber(previousPageNumber => previousPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, more])
    
    return messages.map((message, index) => {
        if (index === 0) {
          return <Message ref={lastMessageRef} message={message} key={message._id} />
        } else {
          return <Message message={message} key={message._id} />
        }
      })
}

export default Messages