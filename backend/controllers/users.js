const inviteUser = (req, res) => {
    const { targetMailAddress } = req.body
    return res.send(targetMailAddress + ' Nanda Gopal')
}

exports.controllers = {
    inviteUser
}