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
        const pendingInvitations = await Invitation
                        .find({  recipients: { $elemMatch: { recipient: userId, status: 'Pending' } }})
                        .populate('senderId', '_id username mail')
                        .populate('recipients.recipient', '-conversations -password')
                        .catch(err => console.error(err))
        const user = await User
                        .findById(userId)
                        .populate({ 
                            path: 'conversations', 
                            populate: { 
                                path: 'participants', 
                                select: '-password -conversations',
                                match: {
                                    _id: { $ne: userId }
                                }
                            } 
                        })

        const directChatUsers = [
            ...new Set(user.conversations.filter(({ isGroupConversation }) => !isGroupConversation).map(({ participants }) => participants.find(x => x._id.toString() !== userId)))
        ]

        newConnectionHandler(socket)
        initialSync(userId, pendingInvitations, directChatUsers, user, socket)
        
        socket.on('acknowledge-presence', ({ ackFrom, ackTo }) => {
            const receiverList = getActiveConnections(ackTo)
            receiverList.forEach(socketId => io.to(socketId).emit('advertise-presence', { userId: ackFrom, advertisementType: 'pulseIn' }))
        })
        
        socket.on('live-message', data => {
            liveMessageHandler(userId, data)
        })

        socket.on('disconnect', () => {
            disconnectHandler(socket)
            advertiseAbsence(userId, directChatUsers)
        })
    })
}

const initialSync = async (userId, pendingInvitations, directChatUsers, userDetails, socket) => {
    // const users = await User.find({ _id: { $in: directChatUsers }}).select('-password')
    advertisePresence(userId, directChatUsers)
    socket.emit('initial-sync', { pendingInvitations, userDetails })
}

const sendInvitation = ({ recipients, senderId, _id }) => {
    const receiverList = recipients.map(({ recipient }) => getActiveConnections(recipient._id)).flat()
    const io = getSocketServerInstance()
    receiverList.forEach(socketId => io.to(socketId).emit('invitation', { recipients, senderId, _id }))
}

const sendInvitationUpdateToOthers = (senderId, conversation, conversationType, userId) => {
    const io = getSocketServerInstance()
    let receiverList = []

    if (conversationType === 'GROUP') {
        receiverList = conversation.participants.map(({ _id }) => userId === _id ? [] : getActiveConnections(_id)).flat()
    } else {
        receiverList = getActiveConnections(senderId)
    }

    receiverList.forEach(socketId => io.to(socketId).emit('add-conversation', conversation))
}

const advertisePresence = (userId, directChatUsers) => {
    const receiverList = directChatUsers.map(({ _id }) => getActiveConnections(_id)).flat()
    const io = getSocketServerInstance()
    receiverList.forEach(socketId => io.to(socketId).emit('advertise-presence', { userId, advertisementType: 'pulseOut' }))
}

const advertiseAbsence = (userId, directChatUsers) => {
    const receiverList = directChatUsers.map(({ _id }) => getActiveConnections(_id)).flat()
    const io = getSocketServerInstance()
    receiverList.forEach(socketId => io.to(socketId).emit('advertise-absence', userId))
}

const liveMessageHandler = async (userId, { conversationId, content, media }) => {
    const data = { author: userId }
    Object.assign(data, conversationId && { conversation: conversationId })
    Object.assign(data, content && { content })
    Object.assign(data, media?.length > 0 && { media })

    let message = await Message.create(data).catch(e => console.error(e))
    message = await message.populate("author", "-password -conversations")
    const conversation = await Conversation
                        .findByIdAndUpdate(conversationId, { lastMessage: message._id }, { new: true })
                        .catch(e => console.error(e))
    updateChatHistory(message, conversation)
}

const updateChatHistory = (message, conversation) => {
    const io = getSocketServerInstance()

    conversation.participants.forEach(participant => {
        const activeConnections = getActiveConnections(participant)
        activeConnections.forEach(socketId => {
            io.to(socketId).emit("live-message", {
                message,
                conversation
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

module.exports = { registerSocketServer, sendInvitation, sendInvitationUpdateToOthers }