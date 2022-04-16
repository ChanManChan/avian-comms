const connectedUsers = new Map()
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

const getActiveConnections = userId => {
    const activeConnections = []
    connectedUsers.forEach((value, key) => {
        if (value.userId == userId) {
            activeConnections.push(key)
        }
    })

    return activeConnections
}

module.exports = {
    addNewConnectedUser,
    removeConnectedUser,
    getActiveConnections,
    setSocketServerInstance,
    getSocketServerInstance,
    getOnlineUsers
}