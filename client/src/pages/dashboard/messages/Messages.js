import React, { useCallback, useRef } from 'react'

import Message from "../message/Message"
import useChatFetch from "../../../hooks/useChatFetch"

const Messages = ({ messages }) => {
    const observer = useRef()
    const { loading, more, setPageNumber } = useChatFetch()
    
    const firstMessageRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
          if (entries[0].isIntersecting && more) {
            setPageNumber(previousPageNumber => previousPageNumber + 1)
          }
        })
        if (node) observer.current.observe(node)
      }, [loading, more, setPageNumber])
    
    return messages.map((message, index) => {
        if (index === 0) {
          return <Message ref={firstMessageRef} message={message} key={message._id} />
        }
        return <Message message={message} key={message._id} />
    })
}

export default Messages