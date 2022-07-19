import { ROOM_ACTIONS } from "../actions/room"

export const DEFAULT_ROOM_DETAILS = {
    isUserRoomCreator: false,
    roomDetails: null,
    localStream: null,
    remoteStreams: [],
    audioOnly: false,
    screenSharingStream: null,
    isScreenSharingActive: false,
}

const DEFAULT_INCOMING_CALL = {
    incomingCallStatus: 'NA',
    roomDetails: null,
}

const INITIAL_STATE = {
    activeRooms: [],
    currentRoom: null,
    incomingCall: DEFAULT_INCOMING_CALL,
    isRoomMinimized: false,
}

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ROOM_ACTIONS.SET_CURRENT_ROOM:
            return {
                ...state,
                currentRoom: action.currentRoom
            }
        case ROOM_ACTIONS.WINDOW_RESIZE:
            return {
                ...state,
                isRoomMinimized: !state.isRoomMinimized
            }
        case ROOM_ACTIONS.CREATE_ROOM:
            return {
                ...state,
                currentRoom: action.isUserRoomCreator ? { ...DEFAULT_ROOM_DETAILS, roomDetails: action.roomDetails } : null,
                incomingCall: action.incomingCall ? action.incomingCall : DEFAULT_INCOMING_CALL,
                activeRooms: [...state.activeRooms, { ...DEFAULT_ROOM_DETAILS, isUserRoomCreator: action.isUserRoomCreator, roomDetails: action.roomDetails }]
            }
        case ROOM_ACTIONS.HANDLE_INCOMING_CALL:
            return {
                ...state,
                incomingCall: DEFAULT_INCOMING_CALL
            }
        case ROOM_ACTIONS.DESTROY_ROOM:
            return INITIAL_STATE
        default:
            return state
    }
}

export default reducer