const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
   let token = req.headers.authorization

   if (!token) {
       return res.status(403).send('Token is required for authentication')
   }

   try {
      token = token.replace(/^Bearer\s+/, "")
      req.user = jwt.verify(token, process.env.JWT_SECRET)
   } catch (error) {
       return res.status(401).send('Invalid Token')
   }

   return next()
}

const verifySocketToken = (socket, next) => {
    const token = socket.handshake.auth?.token

    if (!token) {
        return next(new Error('Token is required for authentication'))
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        socket.user = decoded
    } catch (error) {
        return next(new Error('Invalid Token'))
    }

    next()
}

module.exports = {
    verifyToken,
    verifySocketToken
}