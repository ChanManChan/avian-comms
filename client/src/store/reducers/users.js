import { USER_ACTIONS } from '../actions/users'

const INITIAL_STATE = {
    users: [],
    pendingInvitations: [],
    onlineUsers: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACTIONS.SET_PENDING_INVITATIONS:
            return {
                ...state,
                pendingInvitations: action.pendingInvitations
            }
        case USER_ACTIONS.ADD_INVITATION:
            return {
                ...state,
                pendingInvitations: [action.invitation, ...state.pendingInvitations]
            }
        case USER_ACTIONS.ADD_USER:
            return {
                ...state,
                users: [action.user, ...state.users]
            }
        case USER_ACTIONS.REMOVE_INVITATION:
            return {
                ...state,
                pendingInvitations: state.pendingInvitations.filter(invitation => invitation._id !== action.invitationId)
            }
        case USER_ACTIONS.SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case USER_ACTIONS.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers
            }
        default:
            return state
    }
}

export default reducer