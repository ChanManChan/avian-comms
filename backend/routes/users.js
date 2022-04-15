const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const { controllers } = require('../controllers/users')
const { verifyToken } = require('../middleware/auth')

const invitationSchema = Joi.object({
    targetMailAddress: Joi.string().email()
})

router.post('/invite', verifyToken, validator.body(invitationSchema), controllers.inviteUser)

module.exports = router