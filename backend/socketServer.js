const { verifySocketToken } = require('./middleware/auth')
const { addNewConnectedUser, removeConnectedUser } = require('./store')

const registerSocketServer = server => {
    const io = require('socket.io')(server, {
        cros: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.use((socket, next) => verifySocketToken(socket, next))

    io.on('connection', socket => {
        console.log('User connected ', socket.id)
        newConnectionHandler(socket, io)

        socket.on('disconnect', () => {
            disconnectHandler(socket)
        })
    })
}

const newConnectionHandler = (socket, io) => {
    const userDetails = socket.user
    addNewConnectedUser({ socketId: socket.id, userId: userDetails.userId })
}

const disconnectHandler = socket => {
    removeConnectedUser(socket.id)
}

module.exports = { registerSocketServer }