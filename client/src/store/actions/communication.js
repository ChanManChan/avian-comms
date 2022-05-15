import * as api from '../../api'
import { showAlertMessage } from "./alert"

export const COMMUNICATION_ACTIONS = {
    SET_PENDING_INVITATIONS: 'USERS.SET_PENDING_INVITATIONS',
    ADD_INVITATION: 'USERS.ADD_INVITATION',
    ADD_CONVERSATION: 'USERS.ADD_CONVERSATION',
    UPDATE_ONLINE_STATUS: 'USERS.UPDATE_ONLINE_STATUS',
    REMOVE_INVITATION: 'USERS.REMOVE_INVITATION',
    SET_ONLINE_USERS: 'USERS.SET_ONLINE_USERS',
    SET_CONVERSATIONS: 'USERS.SET_CONVERSATIONS'
}

export const getActions = dispatch => {
    return {
        sendInvitation: (data, closeModal) => dispatch(sendInvitation(data, closeModal)),
        invitationAction: data => dispatch(invitationAction(data))
    }
}

const invitationAction = data => async dispatch => {
    const senderId = data.senderId._id
    delete data.senderId
    const response = await api.invitationAction(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        const { message, conversation } = response.data
        dispatch(showAlertMessage(message))
        dispatch(removeInvitation(data.invitationId))
        if (data.action === 'accept') {
            const participant = conversation.participants.find(x => x._id === senderId)
            dispatch(addConversation({ ...conversation, participants: [{ ...participant, isOnline: false }] }))
        }
    }
}

export const setPendingInvitations = pendingInvitations => {
    return {
        type: COMMUNICATION_ACTIONS.SET_PENDING_INVITATIONS,
        pendingInvitations
    }
}

export const setConversations = (directConversations, groupConversations) => {
    return {
        type: COMMUNICATION_ACTIONS.SET_CONVERSATIONS,
        directConversations,
        groupConversations
    }
}

export const addInvitation = invitation => {
    return {
        type: COMMUNICATION_ACTIONS.ADD_INVITATION,
        invitation
    }
}

export const addConversation = conversation => {
    return {
        type: COMMUNICATION_ACTIONS.ADD_CONVERSATION,
        conversation
    }
}

export const updateOnlineStatus = (userId, isOnline) => {
    return {
        type: COMMUNICATION_ACTIONS.UPDATE_ONLINE_STATUS,
        userId,
        isOnline
    }
}

const removeInvitation = invitationId => {
    return {
        type: COMMUNICATION_ACTIONS.REMOVE_INVITATION,
        invitationId
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