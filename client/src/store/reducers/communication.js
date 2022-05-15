import { COMMUNICATION_ACTIONS } from '../actions/communication'

const INITIAL_STATE = {
    pendingInvitations: [],
    directConversations: [],
    groupConversations: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMMUNICATION_ACTIONS.SET_PENDING_INVITATIONS:
            return {
                ...state,
                pendingInvitations: action.pendingInvitations
            }
        case COMMUNICATION_ACTIONS.ADD_INVITATION:
            return {
                ...state,
                pendingInvitations: [action.invitation, ...state.pendingInvitations]
            }
        case COMMUNICATION_ACTIONS.SET_CONVERSATIONS:
            return {
                ...state,
                directConversations: action.directConversations,
                groupConversations: action.groupConversations
            }
        case COMMUNICATION_ACTIONS.ADD_CONVERSATION:
            return {
                ...state,
                directConversations: [...state.directConversations, action.conversation]
            }
        case COMMUNICATION_ACTIONS.UPDATE_ONLINE_STATUS:
            return {
                ...state,
                directConversations: state.directConversations.map(conversation => {
                    if (conversation.participants[0]._id === action.userId) {
                        return { ...conversation, participants: [{ ...conversation.participants[0], isOnline: action.isOnline }] }
                    }
                    return conversation
                })
            }
        case COMMUNICATION_ACTIONS.REMOVE_INVITATION:
            return {
                ...state,
                pendingInvitations: state.pendingInvitations.filter(invitation => invitation._id !== action.invitationId)
            }
        case COMMUNICATION_ACTIONS.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers: action.onlineUsers
            }
        default:
            return state
    }
}

export default reducer