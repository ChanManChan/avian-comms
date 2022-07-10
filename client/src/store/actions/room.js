export const ROOM_ACTIONS = {
    OPEN_ROOM: 'ROOM.OPEN_ROOM',
    WINDOW_RESIZE: 'ROOM.WINDOW_RESIZE',
    DESTROY_ROOM: 'ROOM.DESTROY_ROOM',
    SET_ROOM_DETAILS: 'ROOM.SET_ROOM_DETAILS',
    SET_ACTIVE_ROOMS: 'ROOM.SET_ACTIVE_ROOMS',
    SET_LOCAL_STREAM: 'ROOM.SET_LOCAL_STREAM',
    SET_ROOM_STREAMS: 'ROOM.SET_ROOM_STREAMS',
    ACCEPT_INCOMING_CALL: 'ROOM.ACCEPT_INCOMING_CALL',
    REJECT_INCOMING_CALL: 'ROOM.REJECT_INCOMING_CALL',
    CALL_AWAITING_ACTION: 'ROOM.CALL_AWAITING_ACTION',
    SET_AUDIO_ONLY: 'ROOM.SET_AUDIO_ONLY',
    SET_SCREEN_SHARE_STREAM: 'ROOM.SCREEN_SHARE_STREAM'
}

export const getActions = dispatch => {
    return {
        setOpenRoom: (isUserRoomCreator, isUserInRoom) => dispatch(setOpenRoom(isUserRoomCreator, isUserInRoom)),
        toggleWindowResize: () => dispatch(toggleWindowResize()),
        destroyRoom: () => dispatch(destroyRoom())
    }
}

const toggleWindowResize = () => {
    return {
        type: ROOM_ACTIONS.WINDOW_RESIZE
    }
}

const setOpenRoom = (isUserRoomCreator = false, isUserInRoom = false) => {
    return {
        type: ROOM_ACTIONS.OPEN_ROOM,
        isUserRoomCreator,
        isUserInRoom
    }
}

const destroyRoom = () => {
    return {
        type: ROOM_ACTIONS.DESTROY_ROOM
    }
}

export const setRoomDetails = ({ roomDetails }, userId) => {
    const roomCreatorId = roomDetails.roomCreator.userId
    return {
        type: ROOM_ACTIONS.SET_ROOM_DETAILS,
        incomingCallStatus:  roomCreatorId !== userId ? ROOM_ACTIONS.CALL_AWAITING_ACTION : 'NA',
        roomDetails,
    }
}