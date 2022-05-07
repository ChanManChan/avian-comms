const express = require('express')
const router = express.Router()

const { controllers } = require('../controllers/communication')
const { verifyToken } = require('../middleware/auth')

router.get('/messages', verifyToken, controllers.fetchChatHistory)

module.exports = router