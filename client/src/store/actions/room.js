export const ROOM_ACTIONS = {
    WINDOW_RESIZE: 'ROOM.WINDOW_RESIZE',
    DESTROY_ROOM: 'ROOM.DESTROY_ROOM',
    CREATE_ROOM: 'ROOM.CREATE_ROOM',
    SET_ACTIVE_ROOMS: 'ROOM.SET_ACTIVE_ROOMS',
    SET_LOCAL_STREAM: 'ROOM.SET_LOCAL_STREAM',
    SET_ROOM_STREAMS: 'ROOM.SET_ROOM_STREAMS',
    CALL_AWAITING_ACTION: 'ROOM.CALL_AWAITING_ACTION',
    HANDLE_INCOMING_CALL: 'ROOM.HANDLE_INCOMING_CALL',
    SET_AUDIO_ONLY: 'ROOM.SET_AUDIO_ONLY',
    SET_SCREEN_SHARE_STREAM: 'ROOM.SCREEN_SHARE_STREAM',
    SET_CURRENT_ROOM: 'ROOM.SET_CURRENT_ROOM'
}

export const getActions = dispatch => {
    return {
        toggleWindowResize: () => dispatch(toggleWindowResize()),
        destroyRoom: () => dispatch(destroyRoom()),
        setCurrentRoom: currentRoom => dispatch(setCurrentRoom(currentRoom)),
        handleIncomingCall: () => dispatch(handleIncomingCall())
    }
}

export const setCurrentRoom = currentRoom => {
    return {
        type: ROOM_ACTIONS.SET_CURRENT_ROOM,
        currentRoom
    }
}

const toggleWindowResize = () => {
    return {
        type: ROOM_ACTIONS.WINDOW_RESIZE
    }
}

const destroyRoom = () => {
    return {
        type: ROOM_ACTIONS.DESTROY_ROOM
    }
}

const handleIncomingCall = () => {
    return {
        type: ROOM_ACTIONS.HANDLE_INCOMING_CALL
    }
}

export const createRoom = ({ roomDetails }, userId) => {
    const roomCreatorId = roomDetails.roomCreator.userId
    const isUserRoomCreator = roomCreatorId === userId

    const payload = {
        type: ROOM_ACTIONS.CREATE_ROOM,
        isUserRoomCreator,
        roomDetails,
    }

    Object.assign(payload, !isUserRoomCreator && {
        incomingCall: {
            incomingCallStatus: ROOM_ACTIONS.CALL_AWAITING_ACTION,
            roomDetails
        }
    })

    return payload
}