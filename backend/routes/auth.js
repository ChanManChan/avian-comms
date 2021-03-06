const express = require('express')
const router = express.Router()
const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const { controllers } = require('../controllers/auth')
const { verifyToken } = require('../middleware/auth')

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required()
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    mail: Joi.string().email().required()
})

router.get('/authenticate', verifyToken, (req, res) => {
    res.status(200).json(req.user)
})
router.post('/register', validator.body(registerSchema), controllers.register)
router.post('/login', validator.body(loginSchema), controllers.login)

router.get('/test', verifyToken, (_, res) => {
    res.status(200).send('request authenticated')
})

module.exports = router