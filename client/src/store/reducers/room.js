import { ROOM_ACTIONS } from "../actions/room"

const INITIAL_STATE = {
    isUserInRoom: false,
    isRoomMinimized: false,
    isUserRoomCreator: false,
    roomDetails: null,
    activeRooms: [],
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ROOM_ACTIONS.OPEN_ROOM:
            return {
                ...state,
                isUserInRoom: action.isUserInRoom,
                isUserRoomCreator: action.isUserRoomCreator
            }
        case ROOM_ACTIONS.WINDOW_RESIZE:
            return {
                ...state,
                isRoomMinimized: !state.isRoomMinimized
            }
        case ROOM_ACTIONS.DESTROY_ROOM:
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer