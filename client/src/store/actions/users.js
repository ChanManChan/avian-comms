import * as api from '../../api'
import { showAlertMessage } from "./alert"

export const USER_ACTIONS = {
    SET_USERS: 'USERS.SET_USERS',
    SET_PENDING_INVITATIONS: 'USERS.SET_PENDING_INVITATIONS',
    ADD_INVITATION: 'USERS.ADD_INVITATION',
    ADD_USER: 'USERS.ADD_USER',
    UPDATE_ONLINE_STATUS: 'USERS.UPDATE_ONLINE_STATUS',
    REMOVE_INVITATION: 'USERS.REMOVE_INVITATION',
    SET_ONLINE_USERS: 'USERS.SET_ONLINE_USERS'
}

export const getActions = dispatch => {
    return {
        sendInvitation: (data, closeModal) => dispatch(sendInvitation(data, closeModal)),
        invitationAction: data => dispatch(invitationAction(data))
    }
}

const invitationAction = data => async dispatch => {
    const sender = data.sender
    delete data.sender
    const response = await api.invitationAction(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        dispatch(showAlertMessage(data.action === 'accept' ? 'Invitation accepted' : 'Invitaion rejected'))
        dispatch(removeInvitation(data.invitationId))
        if (data.action === 'accept') {
            dispatch(addUser(sender))
        }
    }
}

export const setPendingInvitations = pendingInvitations => {
    return {
        type: USER_ACTIONS.SET_PENDING_INVITATIONS,
        pendingInvitations
    }
}

export const setUsers = users => {
    return {
        type: USER_ACTIONS.SET_USERS,
        users
    }
}

export const addInvitation = invitation => {
    return {
        type: USER_ACTIONS.ADD_INVITATION,
        invitation
    }
}

export const addUser = user => {
    return {
        type: USER_ACTIONS.ADD_USER,
        user
    }
}

export const updateOnlineStatus = (userId, isOnline) => {
    return {
        type: USER_ACTIONS.UPDATE_ONLINE_STATUS,
        userId,
        isOnline
    }
}

const removeInvitation = invitationId => {
    return {
        type: USER_ACTIONS.REMOVE_INVITATION,
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