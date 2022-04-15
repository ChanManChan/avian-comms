import * as api from '../../api'
import { showAlertMessage } from "./alert"

export const USER_ACTIONS = {
    SET_USERS: 'USERS.SET_USERS',
    SET_PENDING_INVITATIONS: 'USERS.SET_PENDING_INVITATIONS',
    SET_ONLINE_USERS: 'USERS.SET_ONLINE_USERS'
}

export const getActions = dispatch => {
    return {
        sendInvitation: (data, closeModal) => dispatch(sendInvitation(data, closeModal))
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