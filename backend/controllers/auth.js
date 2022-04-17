const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const register = async (req, res) => {
    try {
        const { username, mail, password } = req.body
        const userExists = await User.exists({ mail: mail.toLowerCase() })
        if (userExists) {
            return res.status(409).send('email already in use')
        }
        
        const encryptedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ username, mail: mail.toLowerCase(), password: encryptedPassword })

        const token = jwt.sign({ userId: user._id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.status(201).json({ mail: user.mail, token, username: user.username, _id: user._id })
    } catch (error) {
        res.status(500).send('Error occurred. Please try again.')
    }
}

const login  = async (req, res) => {
    try {
        const { mail, password } = req.body
        const user = await User.findOne({ mail: mail.toLowerCase() })
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user._id, mail: user.mail }, process.env.JWT_SECRET, { expiresIn: '24h' })
            return res.status(200).json({ username: user.username, token, mail: user.mail, _id: user._id })
        }
        res.status(400).send('Invalid credentials')
    } catch (error) {
        res.status(500).send('Error occurred. Please try again.')
    }
}

exports.controllers = {
    register,
    login
}