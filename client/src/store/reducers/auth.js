const INITIAL_STATE = {
    userDetails: null
}

const reducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'DUMMY':
            return {
                ...state
            }
        default:
            return state
    }
}

export default reducer