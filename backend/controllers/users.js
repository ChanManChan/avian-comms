const Invitation = require("../models/Invitation")
const User = require("../models/User")
const { sendInvitation, sendUserListUpdate } = require("../socketServer")

const inviteUser = async (req, res) => {
    const { targetMailAddress } = req.body
    const { userId, mail } = req.user

    if (mail.toLowerCase() == targetMailAddress.toLowerCase()) {
        return res.status(409).send('Invalid recipient mail address')
    }

    const targetUser = await User.findOne({ mail: targetMailAddress.toLowerCase() })

    if (!targetUser) {
        return res.status(404).send('Recipient not found')
    }

    const invitationPending = await Invitation.exists({ senderId: userId, receiverId: targetUser._id })

    if (invitationPending) {
        return res.status(409).send('Invitation is already in pending status')
    }

    const alreadyAcquainted = targetUser.people.find(personId => personId.toString() == userId)

    if (alreadyAcquainted) {
        return res.status(409).send('Already Acquainted')
    }

    let createdInvitation = await Invitation.create({ senderId: userId, receiverId: targetUser._id })
    createdInvitation = await createdInvitation.populate('senderId', '_id username mail')
    sendInvitation(createdInvitation)

    return res.status(201).send('Invitation has been sent')
}

const inviteAction = async (req, res) => {
    const { action, invitationId } = req.body
    const { userId } = req.user

    if (action === 'reject') {
        const validInvitation = await Invitation.exists({ _id: invitationId, receiverId: userId })
        if (validInvitation) {
            await Invitation.findByIdAndDelete(invitationId)
            return res.status(200).send('Invitation successfully rejected')
        }
    } else {
        const invitation = await Invitation.findById(invitationId)
         if (!invitation) {
             return res.status(404).send('Invitation not found')
         }

         const { senderId, receiverId } = invitation
         await User.findByIdAndUpdate(senderId, { $addToSet: { people: receiverId } })
         const { _id, mail, username } = await User.findByIdAndUpdate(receiverId, { $addToSet: { people: senderId } }, { new: true })
         await Invitation.findByIdAndDelete(invitationId)

         sendUserListUpdate(senderId, { _id: _id.toString(), mail, username })
         return res.status(200).send('Invitation successfully accepted')
    }
}

exports.controllers = {
    inviteUser,
    inviteAction
}