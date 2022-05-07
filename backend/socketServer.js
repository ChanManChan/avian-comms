const { default: mongoose } = require('mongoose')
const { verifySocketToken } = require('./middleware/auth')
const Conversation = require('./models/Conversation')
const Invitation = require('./models/Invitation')
const Message = require('./models/Message')
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

    io.on('connection', async socket => {
        const userId = socket.user.userId
        const pendingInvitations = await Invitation.find({ receiverId: userId }).populate('senderId', '_id username mail').catch(err => console.error(err))
        const user = await User.findById(userId, { _id: 1, people: 1 }).populate('people', '_id username mail')
        newConnectionHandler(socket)
        initialSync(userId, pendingInvitations, user.people, socket)
        
        socket.on('acknowledge-presence', ({ ackFrom, ackTo }) => {
            const receiverList = getActiveConnections(ackTo)
            receiverList.forEach(socketId => io.to(socketId).emit('advertise-presence', { userId: ackFrom, advertisementType: 'pulseIn' }))
        })
        
        socket.on('direct-message', data => {
            directMessageHandler(userId, data)
        })

        socket.on('disconnect', () => {
            disconnectHandler(socket)
            advertiseAbsence(userId, user.people)
        })
    })
}

const initialSync = (userId, pendingInvitations, people, socket) => {
    advertisePresence(userId, people)
    socket.emit('initial-sync', { pendingInvitations, users: people })
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

const advertisePresence = (userId, people) => {
    const receiverList = people.map(person => getActiveConnections(person._id)).flat()
    const io = getSocketServerInstance()
    receiverList.forEach(socketId => io.to(socketId).emit('advertise-presence', { userId, advertisementType: 'pulseOut' }))
}

const advertiseAbsence = (userId, people) => {
    const receiverList = people.map(person => getActiveConnections(person._id)).flat()
    const io = getSocketServerInstance()
    receiverList.forEach(socketId => io.to(socketId).emit('advertise-absence', userId))
}

const directMessageHandler = async (userId, data) => {
    const { receiverId, content } = data
    let message = await Message.create({ content, author: userId, date: new Date(), type: "DIRECT" }).catch(e => console.error(e))
    message = await message.populate("author", "-password -people")
    const conversation = await Conversation.findOneAndUpdate(
        { participants: { $all: [
            { $elemMatch: { $eq: mongoose.Types.ObjectId(userId) }},
            { $elemMatch: { $eq: mongoose.Types.ObjectId(receiverId) }},
        ] } },
        { $addToSet: { messages: message._id }, $setOnInsert: { participants: [ userId, receiverId ] } },
        { upsert: true, new: true }
    ).catch(e => console.error(e))
    updateChatHistory(message, conversation)
}

const updateChatHistory = (message, conversation) => {
    const io = getSocketServerInstance()

    conversation.participants.forEach(participant => {
        const activeConnections = getActiveConnections(participant)
        activeConnections.forEach(socketId => {
            io.to(socketId).emit("direct-message", {
                message,
                participants: conversation.participants
            })
        })
    })
}

const newConnectionHandler = (socket) => {
    const userDetails = socket.user
    addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId })
}

const disconnectHandler = socket => {
    removeConnectedUser(socket.id)
}

module.exports = { registerSocketServer, sendInvitation, sendUserListUpdate }