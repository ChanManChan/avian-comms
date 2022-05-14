const Invitation = require("../models/Invitation")
const Conversation = require('../models/Conversation')
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

    const invitationPending = await Invitation.exists({ senderId: userId, recipients: [{ recipient: targetUser._id, status: 'Pending' }] })

    if (invitationPending) {
        return res.status(409).send('Invitation is already in pending status')
    }

    const alreadyAcquainted = await Conversation.findOne({ isGroupConversation: false, participants: [userId, targetUser._id] })

    if (alreadyAcquainted) {
        return res.status(409).send('Already Acquainted')
    }

    let createdInvitation = await Invitation.create({ senderId: userId, recipients: [{ recipient: targetUser._id, status: 'Pending' }] })
    createdInvitation = await createdInvitation.populate('senderId', '-password')
    sendInvitation(createdInvitation)

    return res.status(201).send('Invitation has been sent')
}

const inviteAction = async (req, res) => {
    const { action, invitationId } = req.body
    const { userId, mail, username } = req.user

    if (action === 'reject') {
        const validInvitation = await Invitation.exists({ _id: invitationId, recipients: [{ recipient: userId, status: 'Pending' }] })
        if (validInvitation) {
            await Invitation.findByIdAndDelete(invitationId)
            return res.status(200).send('Invitation successfully rejected')
        }
    } else {
        const invitation = await Invitation.findById(invitationId)
         if (!invitation) {
             return res.status(404).send('Invitation not found')
         }

         const { senderId } = invitation

         const conversation = await Conversation.create({ participants: [senderId, userId], isGroupConversation: false })
         await User.updateMany({ _id: { $in: [userId, senderId] } }, { $addToSet: { conversations: conversation._id } })
         await Invitation.findByIdAndDelete(invitationId)

         sendUserListUpdate(senderId, { _id: userId, mail, username })
         return res.status(200).send('Invitation successfully accepted')
    }
}

exports.controllers = {
    inviteUser,
    inviteAction
}