const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const { controllers } = require('../controllers/users')
const { verifyToken } = require('../middleware/auth')

const invitationSchema = Joi.object({
    recipients: Joi.array().items(Joi.string().email()).required()
})

const invitationActionSchema = Joi.object({
    action: Joi.string().valid('accept', 'reject'),
    invitationId: Joi.string().required()
})

const updateProfileSchema = Joi.object({
    username: Joi.string().min(3).max(12).optional(),
    password: Joi.string().min(6).max(12).optional(),
    profilePicture: Joi.string().optional()
})

router.post('/invite', verifyToken, validator.body(invitationSchema), controllers.inviteUser)
router.put('/invite', verifyToken, validator.body(invitationActionSchema), controllers.inviteAction)
router.patch('/update', verifyToken, validator.body(updateProfileSchema), controllers.updateProfile)

module.exports = router