const connectedUsers = new Map()
let activeRooms = []
let io = null

const setSocketServerInstance = ioInstance => {
    io = ioInstance
}

const getSocketServerInstance = () => {
    return io
}

const addNewConnectedUser = ({ socketId, userId }) => {
    connectedUsers.set(socketId, { userId })
    console.log('new connected users ', connectedUsers)
}

const removeConnectedUser = socketId => {
    if (connectedUsers.has(socketId)) {
        connectedUsers.delete(socketId)
        console.log('new connected users ', connectedUsers)
    }
}

const getOnlineUsers = () => {
    const onlineUsers = []

    connectedUsers.forEach((value, key) => {
        onlineUsers.push({ socketId: key, userId: value.userId })
    })

    return onlineUsers
}

const getActiveConnections = (userId = '') => {
    const activeConnections = []
    connectedUsers.forEach((value, key) => {
        if (value.userId === userId.toString()) {
            activeConnections.push(key)
        }
    })

    return activeConnections
}

// rooms
const addNewActiveRoom = ({ userId, mail, username }, socketId, conversationId) => {
    const newActiveRoom = {
        roomCreator: {
            userId,
            mail,
            username,
            socketId
        },
        participants: [
            {
                userId,
                socketId
            }
        ],
        roomId: conversationId
    }

    activeRooms = [...activeRooms, newActiveRoom]
    return newActiveRoom
}

const removeUserFromRoom = (userId, roomId) => {
    activeRooms = activeRooms.map(room => {
        if (room.roomId === roomId) {
            const filteredParticipants = room.participants.filter(participant => participant.userId !== userId)
            if (filteredParticipants.length === 0) {
                return null
            }
            return { ...room, participants: filteredParticipants }
        }
        return room
    }).filter(x => x)
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers,
    addNewActiveRoom,
    removeUserFromRoom
}