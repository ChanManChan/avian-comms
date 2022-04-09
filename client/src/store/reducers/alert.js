import { ALERT_ACTIONS } from '../actions/alert'

const INITIAL_STATE = {
    showAlert: false,
    alertMessageContent: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ALERT_ACTIONS.SHOW_ALERT_MESSAGE:
            return {
                ...state,
                showAlert: true,
                alertMessageContent: action.content
            }
        case ALERT_ACTIONS.HIDE_ALERT_MESSAGE:
            return {
                ...state,
                showAlert: false,
                alertMessageContent: null
            }
        default:
            return state
    }
}

export default reducer