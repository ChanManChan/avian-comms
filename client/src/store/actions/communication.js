import * as api from '../../api'
import { showAlertMessage } from "./alert"
import { CHAT_TYPES } from './chat'

export const COMMUNICATION_ACTIONS = {
    SET_PENDING_INVITATIONS: 'COMMUNICATION.SET_PENDING_INVITATIONS',
    ADD_INVITATION: 'COMMUNICATION.ADD_INVITATION',
    ADD_CONVERSATION: 'COMMUNICATION.ADD_CONVERSATION',
    UPDATE_ONLINE_STATUS: 'COMMUNICATION.UPDATE_ONLINE_STATUS',
    REMOVE_INVITATION: 'COMMUNICATION.REMOVE_INVITATION',
    SET_ONLINE_USERS: 'COMMUNICATION.SET_ONLINE_USERS',
    SET_CONVERSATIONS: 'COMMUNICATION.SET_CONVERSATIONS'
}

export const getActions = dispatch => {
    return {
        sendInvitation: (data, closeModal) => dispatch(sendInvitation(data, closeModal)),
        invitationAction: data => dispatch(invitationAction(data))
    }
}

const invitationAction = data => async dispatch => {
    delete data.senderId
    const response = await api.invitationAction(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        const { actionBy, message, conversation, conversationType } = response.data

        dispatch(showAlertMessage(message))
        dispatch(removeInvitation(data.invitationId, conversationType))
        if (data.action === 'accept') {
            const participants = conversation.participants.filter(x => x._id !== actionBy)
            dispatch(addConversation({ 
                ...conversation, 
                participants: conversationType === CHAT_TYPES.DIRECT ? [{ ...participants[0], isOnline: false }] : participants
             }, conversationType))
        }
    }
}

export const setPendingInvitations = (pendingInvitations = []) => {
    const pendingDirectInvitations = []
    const pendingGroupInvitations = []

    pendingInvitations.forEach(invitation => {
        if (invitation.recipients.length === 1) {
            pendingDirectInvitations.push(invitation)
        } else {
            pendingGroupInvitations.push(invitation)
        }
    })

    return {
        type: COMMUNICATION_ACTIONS.SET_PENDING_INVITATIONS,
        pendingDirectInvitations,
        pendingGroupInvitations
    }
}

export const setConversations = (directConversations, groupConversations) => {
    return {
        type: COMMUNICATION_ACTIONS.SET_CONVERSATIONS,
        directConversations,
        groupConversations
    }
}

export const addInvitation = (invitation, conversationType) => {
    return {
        type: COMMUNICATION_ACTIONS.ADD_INVITATION,
        invitation,
        conversationType
    }
}

export const addConversation = (conversation, conversationType) => {
    return {
        type: COMMUNICATION_ACTIONS.ADD_CONVERSATION,
        conversation,
        conversationType
    }
}

export const updateOnlineStatus = (userId, isOnline) => {
    return {
        type: COMMUNICATION_ACTIONS.UPDATE_ONLINE_STATUS,
        userId,
        isOnline
    }
}

const removeInvitation = (invitationId, conversationType) => {
    return {
        type: COMMUNICATION_ACTIONS.REMOVE_INVITATION,
        invitationId,
        conversationType
    }
}

const sendInvitation = (data, closeModal) => async dispatch => {
    const response = await api.sendInvitation(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        dispatch(showAlertMessage('Invitation has been sent'))
        closeModal()
    }
}