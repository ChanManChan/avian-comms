import { AUTH_ACTIONS } from '../actions/auth'

const INITIAL_STATE = {
    userDetails: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case AUTH_ACTIONS.SET_USER_DETAILS:
            return {
                ...state,
                userDetails: action.userDetails
            }
        default:
            return state
    }
}

export default reducer