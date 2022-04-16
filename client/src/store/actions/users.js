import * as api from '../../api'
import { showAlertMessage } from "./alert"

export const USER_ACTIONS = {
    SET_USERS: 'USERS.SET_USERS',
    SET_PENDING_INVITATIONS: 'USERS.SET_PENDING_INVITATIONS',
    ADD_INVITATION: 'USERS.ADD_INVITATION',
    SET_ONLINE_USERS: 'USERS.SET_ONLINE_USERS'
}

export const getActions = dispatch => {
    return {
        sendInvitation: (data, closeModal) => dispatch(sendInvitation(data, closeModal)),
        invitationAction: data => dispatch(invitationAction(data))
    }
}

const invitationAction = data => async dispatch => {
    const response = await api.invitationAction(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        dispatch(showAlertMessage(data.action === 'accept' ? 'Invitation accepted' : 'Invitaion rejected'))
    }
}

export const setPendingInvitations = pendingInvitations => {
    return {
        type: USER_ACTIONS.SET_PENDING_INVITATIONS,
        pendingInvitations
    }
}

export const addInvitation = invitation => {
    return {
        type: USER_ACTIONS.ADD_INVITATION,
        invitation
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