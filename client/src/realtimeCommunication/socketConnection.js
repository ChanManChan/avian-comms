import io from 'socket.io-client'

import store from '../store/store'
import { addInvitation, addConversation, setConversations, setPendingInvitations, updateOnlineStatus } from '../store/actions/communication'
import { addMessage, CHAT_TYPES } from '../store/actions/chat'
let socket = null

export const connectWithSocketServer = user => {
    socket = io('http://localhost:5000', {
        auth: {
            token: user.token
        }
    })

    socket.on('connect', () => {
        console.log('successfully connected with socket.io server ', socket.id)
    })

    socket.on('initial-sync', ({ users, pendingInvitations, userDetails }) => {
        const directConversations = []
        const groupConversations = []
        userDetails.conversations.forEach(x => {
            if (x.isGroupConversation) {
                return groupConversations.push(x)
            }
            directConversations.push({ ...x, participants: x.participants.map(y => ({ ...y, isOnline: false })) })
        })
        store.dispatch(setPendingInvitations(pendingInvitations))
        store.dispatch(setConversations(directConversations, groupConversations))
    })

    socket.on('invitation', data => {
        const conversationType = data.recipients.length === 1 ? CHAT_TYPES.DIRECT : CHAT_TYPES.GROUP
        store.dispatch(addInvitation(data, conversationType))
    })

    socket.on('add-conversation', conversation => {
        const conversationType = conversation.isGroupConversation ? CHAT_TYPES.GROUP : CHAT_TYPES.DIRECT
        const userId = store.getState().auth.userDetails._id
        const participants = conversation.participants.filter(x => x._id !== userId)
        store.dispatch(addConversation({
            ...conversation, 
            participants: conversationType === CHAT_TYPES.DIRECT ? [{ ...participants[0], isOnline: true }] : participants 
        },
        conversationType))
    })

    socket.on('advertise-presence', ({ userId, advertisementType }) => {
        if (advertisementType === 'pulseOut') {
            socket.emit('acknowledge-presence', { ackFrom: store.getState().auth.userDetails._id, ackTo: userId })
        }
        store.dispatch(updateOnlineStatus(userId, true))
    })

    socket.on('advertise-absence', data => {
        store.dispatch(updateOnlineStatus(data, false))
    })

    socket.on('direct-message', data => {
        const lastMessage = store.getState().chat.messages.at(-1)
        store.dispatch(addMessage(data, lastMessage))
    })
}

export const sendDirectMessage = data => {
    socket.emit('direct-message', data)
}