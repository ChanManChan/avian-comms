import { COMMUNICATION_ACTIONS } from '../actions/communication'

const INITIAL_STATE = {
    pendingDirectInvitations: [],
    pendingGroupInvitations: [],
    directConversations: [],
    groupConversations: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case COMMUNICATION_ACTIONS.SET_PENDING_INVITATIONS:
            return {
                ...state,
                pendingDirectInvitations: action.pendingDirectInvitations,
                pendingGroupInvitations: action.pendingGroupInvitations
            }
        case COMMUNICATION_ACTIONS.ADD_INVITATION:
            return {
                ...state,
                ...(action.invitationType === 'group' ? 
                    { pendingGroupInvitations: [action.invitation, ...state.pendingGroupInvitations] }
                    :
                    { pendingDirectInvitations: [action.invitation, ...state.pendingDirectInvitations] })
            }
        case COMMUNICATION_ACTIONS.REMOVE_INVITATION:
            return {
                ...state,
                ...(action.invitationType === 'group' ?
                    { pendingGroupInvitations: state.pendingGroupInvitations.filter(invitation => invitation._id !== action.invitationId) } 
                    :
                    { pendingDirectInvitations: state.pendingDirectInvitations.filter(invitation => invitation._id !== action.invitationId) })
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