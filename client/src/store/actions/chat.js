export const CHAT_TYPES = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP'
}

export const CHAT_ACTIONS = {
    SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
    SET_MESSAGES: 'CHAT.SET_MESSAGES',
    SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE'
}

export const getActions = dispatch => {
    return {
        setChosenChatDetails: (chatDetails, chatType) => dispatch(setChosenChatDetails(chatDetails, chatType))
    }
}

const setChosenChatDetails = (chatDetails, chatType) => {
    return {
        type: CHAT_ACTIONS.SET_CHOSEN_CHAT_DETAILS,
        chatType,
        chatDetails
    }
}

const setMessages = messages => {
    return {
        type: CHAT_ACTIONS.SET_MESSAGES,
        messages
    }
}