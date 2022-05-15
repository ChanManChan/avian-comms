import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { fetchChatHistory } from '../api'
import { prependMessages } from '../store/actions/chat'

export default function useChatFetch() {
    const dispatch = useDispatch()
    const { chosenChatDetails: { conversationId } } = useSelector(store => ({ ...store.chat }))
    const [loading, setLoading] = useState(true)
    const [more, setMore] = useState(false)
    const [pageNumber, setPageNumber] = useState(0)
    
    useEffect(() => {
        setPageNumber(0)
        updateChatHistory(0)
    }, [conversationId])

    useEffect(() => {
        if (pageNumber > 0) {
            updateChatHistory(pageNumber)     
        }
    }, [pageNumber])

    const updateChatHistory = pageNumber => {
        setLoading(true)
        
        fetchChatHistory({ conversationId, pageSize: 20, pageNumber })
        .then(res => {
            const messages = res.data ?? []
            dispatch(prependMessages(messages))
            setMore(messages.length > 0)
            setLoading(false)
        })
    }

    return { loading, more, setPageNumber }
}