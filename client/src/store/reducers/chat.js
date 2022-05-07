import { CHAT_ACTIONS } from '../actions/chat'

const INITIAL_STATE = {
    chosenChatDetails: null,
    chatType: null,
    messages: []
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CHAT_ACTIONS.SET_CHOSEN_CHAT_DETAILS:
            return {
                ...state,
                chosenChatDetails: action.chatDetails,
                chatType: action.chatType,
                messages: []
            }
        case CHAT_ACTIONS.PREPEND_MESSAGES:
            return {
                ...state,
                messages: [...action.messages, ...state.messages]
            }
        default:
            return state
    }
}

export default reducer