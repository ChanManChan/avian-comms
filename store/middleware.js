const axios = require('axios')

const verifyToken = async (req, res, next) => {
    let token = req.headers.authorization
 
    if (!token) {
        return res.status(403).send('Token is required for authentication')
    }
 
    try {
       const validationResult = await axios.get('http://localhost:5000/api/auth/authenticate', { headers: { Authorization: token }})
       req.user = validationResult.data
    } catch (error) {
        return res.status(401).send('Invalid Token')
    }
 
    return next()
}
 
module.exports = {
    verifyToken
}