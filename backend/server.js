const express = require('express')
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const socketServer = require('./socketServer')

const PORT = process.env.PORT || process.env.API_PORT

const app = express()
app.use(express.json())
app.use(cors())

// routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/users')
const communicationRoutes = require('./routes/communication')
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/communications', communicationRoutes)

const server = http.createServer(app)
socketServer.registerSocketServer(server)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    server.listen(PORT, () => {
        console.log('Server is listening on port: ' + PORT)
    })
}).catch(err => console.error('Database connection failed. Server not started.', err))