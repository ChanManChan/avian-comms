import { dateFormatter } from '../../shared/utils'
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
                messages: [
                    ...action.messages, 
                    ...(state.messages.length > 0 && action.messages.length > 0 ? [
                        {
                            ...state.messages[0], 
                            sameDay: dateFormatter(action.messages.at(-1).createdAt) === dateFormatter(state.messages[0].createdAt), 
                            sameAuthor: action.messages.at(-1).author._id === state.messages[0].author._id 
                        },
                        ...state.messages.slice(1)
                    ]: state.messages)
                ]
            }
        case CHAT_ACTIONS.ADD_MESSAGE: {
            const conversationId = action.conversation._id
            if (conversationId !== state.chosenChatDetails.conversationId) {
                return state
            }
            const messages = state.messages.slice(0, -1)
            const currentLastMessage = state.messages.at(-1)
            delete currentLastMessage?.live
            return {
                ...state,
                messages: [...messages, ...(currentLastMessage ? [currentLastMessage] : []), action.message]
            }
        }
        case CHAT_ACTIONS.REMOVE_LIVE_TAG:
            const lastMessage = state.messages.at(-1)
            delete lastMessage.live
            return {
                ...state,
                messages: [...state.messages.slice(0, -1), lastMessage]
            }
        default:
            return state
    }
}

export default reducer