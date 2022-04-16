const { verifySocketToken } = require('./middleware/auth')
const Invitation = require('./models/Invitation')
const User = require('./models/User')
const { addNewConnectedUser, removeConnectedUser, getActiveConnections, setSocketServerInstance, getSocketServerInstance } = require('./store')

const registerSocketServer = server => {
    const io = require('socket.io')(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    setSocketServerInstance(io)

    io.use((socket, next) => verifySocketToken(socket, next))

    io.on('connection', socket => {
        const userId = socket.user.userId
        console.log('user connected: ', userId)
        newConnectionHandler(socket)
        initialSync(userId, socket)

        socket.on('disconnect', () => {
            disconnectHandler(socket)
        })
    })
}

const initialSync = async (userId, socket) => {
    const pendingInvitations = await Invitation.find({ receiverId: userId }).populate('senderId', '_id username mail').catch(err => console.error(err))
    const user = await User.findById(userId, { _id: 1, people: 1 }).populate('people', '_id username mail')
    socket.emit('initial-sync', { pendingInvitations, users: user.people })
}

const sendInvitation = ({ receiverId, senderId, _id }) => {
    const receiverList = getActiveConnections(receiverId)
    const io = getSocketServerInstance()

    receiverList.forEach(socketId => io.to(socketId).emit('invitation', { receiverId, senderId, _id }))
}

const sendUserListUpdate = (senderId, recipient) => {
    const receiverList = getActiveConnections(senderId)
    const io = getSocketServerInstance()
    
    receiverList.forEach(socketId => io.to(socketId).emit('add-user', recipient))
}

const newConnectionHandler = (socket) => {
    const userDetails = socket.user
    addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId })
}

const disconnectHandler = socket => {
    removeConnectedUser(socket.id)
}

module.exports = { registerSocketServer, sendInvitation, sendUserListUpdate }