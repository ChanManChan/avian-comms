import React from 'react'
import { useDispatch } from 'react-redux'
import { CHAT_ACTIONS, CHAT_TYPES } from '../../../store/actions/chat'

import './GroupSidebar.css'

const GroupSidebar = () => {
    const dispatch = useDispatch()

    const DirectConversationButton = () => {
        return (
            <button className='sidebarButton' onClick={() => dispatch({ type: CHAT_ACTIONS.SET_CHAT_TYPE, chatType: CHAT_TYPES.DIRECT })}>
                <i className='fa-solid fa-person'></i>
            </button>
        )
    }

    const GroupConversationButton = () => {
        return (
            <button className='sidebarButton' onClick={() => dispatch({ type: CHAT_ACTIONS.SET_CHAT_TYPE, chatType: CHAT_TYPES.GROUP })}>
                <i className='fa-solid fa-people-group'></i>
            </button>
        )
    }

    return (
        <aside className='groupSidebarContainer'>
            <DirectConversationButton />
            <GroupConversationButton />
        </aside>
    )
}

export default GroupSidebar