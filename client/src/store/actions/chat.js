import * as api from '../../api'
import { showAlertMessage } from "./alert"
import { dateFormatter } from '../../shared/utils'

export const CHAT_TYPES = {
    DIRECT: 'DIRECT',
    GROUP: 'GROUP'
}

export const CHAT_ACTIONS = {
    SET_CHOSEN_CHAT_DETAILS: 'CHAT.SET_CHOSEN_CHAT_DETAILS',
    PREPEND_MESSAGES: 'CHAT.PREPEND_MESSAGES',
    ADD_MESSAGE: 'CHAT.ADD_MESSAGE',
    SET_CHAT_TYPE: 'CHAT.SET_CHAT_TYPE'
}

export const getActions = dispatch => {
    return {
        setChosenChatDetails: (chatDetails, chatType) => dispatch(setChosenChatDetails(chatDetails, chatType)),
        getChosenChatHistory: data => dispatch(getChosenChatHistory(data))
    }
}

const setChosenChatDetails = (chatDetails, chatType) => {
    return {
        type: CHAT_ACTIONS.SET_CHOSEN_CHAT_DETAILS,
        chatType,
        chatDetails
    }
}

const getChosenChatHistory = data => async dispatch => {
    const response = await api.fetchChatHistory(data)
    if (response.error) {
        dispatch(showAlertMessage(response.exception.response.data))
    } else {
        dispatch(prependMessages(response.data.messages))
    }
}

export const addMessage = (message, lastMessage) => {
    return {
        type: CHAT_ACTIONS.ADD_MESSAGE,
        message: {
            ...message,
            sameAuthor: lastMessage?.author._id === message.author._id,
            sameDay: dateFormatter(lastMessage?.createdAt) === dateFormatter(message.createdAt)
        }
    }
}

export const prependMessages = messages => {
    function* windowGenerator(inputArray, size) {
        for (let index = 0; index + size <= inputArray.length; index++) {
            yield inputArray.slice(index, index + size)
        }
    }

    function toWindows(inputArray, size) {
        return Array.from(windowGenerator(inputArray, size))
    }

    return {
        type: CHAT_ACTIONS.PREPEND_MESSAGES,
        messages: toWindows(messages.reverse(), 2).map((window, index) => {
            if (index === 0) {
                return [
                    { ...window[0], sameAuthor: false, sameDay: false },
                    { 
                        ...window[1], 
                        sameAuthor: window[0].author._id === window[1].author._id, 
                        sameDay: dateFormatter(window[0].createdAt) === dateFormatter(window[1].createdAt)
                    }
                ]
            }
            return { 
                ...window[1], 
                sameAuthor: window[0].author._id === window[1].author._id, 
                sameDay: dateFormatter(window[0].createdAt) === dateFormatter(window[1].createdAt)
            }
        }).flat()
    }
}