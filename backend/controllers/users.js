const Invitation = require("../models/Invitation")
const Conversation = require('../models/Conversation')
const User = require("../models/User")
const { sendInvitation, sendUserListUpdate } = require("../socketServer")

const inviteUser = async (req, res) => {
    let { recipients } = req.body
    const { userId, mail } = req.user

    if (recipients.length > 1) {
        recipients = recipients.filter(x => x !== mail)
        const targetUsers = await User.find({ mail: { $in: recipients }}).select('-conversations -password')

        if (targetUsers.length === 0) {
            return res.status(404).send('None of the recipients were found')
        }

        const targetUserIds = targetUsers.map(x => x._id)

        const invitationPending = await Invitation.exists({ 
            senderId: userId, 
            recipients: { $size: targetUsers.length },
            'recipients.recipient': { $in: targetUserIds }
        })
        
        if (invitationPending) {
            return res.status(409).send('Invitation already exists')
        }

        const alreadyAcquainted = await Conversation.findOne({ isGroupConversation: true, participants: [userId, ...targetUserIds] })

        if (alreadyAcquainted) {
            return res.status(409).send('Already Acquainted')
        }

        let createdInvitation = await Invitation.create({ senderId: userId, recipients: targetUsers.map(x => ({ recipient: x._id, status: 'Pending' })) })
        createdInvitation = await createdInvitation.populate('senderId', '-password')

        sendInvitation(createdInvitation)
        
        return res.status(200).json('Group invitation has been sent')
    } else {
        if (recipients.length === 1 && mail.toLowerCase() == recipients[0].toLowerCase()) {
            return res.status(409).send('Cannot send invitation to yourself')
        }
    
        const targetUser = await User.findOne({ mail: recipients[0].toLowerCase() })
    
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
}

const inviteAction = async (req, res) => {
    const { action, invitationId } = req.body
    const { userId } = req.user
    const invitation = await Invitation.findById(invitationId)
    
    if (!invitation) {
        return res.status(404).send('Invitation not found')
    }

    const { senderId, recipients } = invitation

    if (action === 'reject') {
        if (recipients.length === 1) {
            await Invitation.findByIdAndDelete(invitationId)
            return res.status(200).json({ message: 'Invitation successfully rejected' })
        } else {
            const { recipients } = await Invitation.findOneAndUpdate({ _id: invitationId, 'recipients.recipient': userId }, { $set: { 'recipients.$.status': 'Rejected' } }, { new: true })
            if (recipients.every(({ status }) => ['Accepted', 'Rejected'].includes(status))) {
                await Invitation.findByIdAndDelete(invitationId)
            }
        }
    } else {
         if (recipients.length === 1) {
            let conversation = await Conversation.create({ participants: [senderId, userId], isGroupConversation: false })
            conversation = await conversation.populate('participants', '-password -conversations')
            await User.updateMany({ _id: { $in: [userId, senderId] } }, { $addToSet: { conversations: conversation._id } })
            await Invitation.findByIdAndDelete(invitationId)
   
            sendUserListUpdate(senderId, conversation)
            return res.status(200).json({ conversation, message: 'Invitation successfully accepted' })
         } else {
            const { recipients } = await Invitation.findOneAndUpdate({ _id: invitationId, 'recipients.recipient': userId }, { $set: { 'recipients.$.status': 'Accepted' } }, { new: true })
            if (recipients.every(({ status }) => ['Accepted', 'Rejected'].includes(status))) {
                await Invitation.findByIdAndDelete(invitationId)
            }
         }
    }
}

exports.controllers = {
    inviteUser,
    inviteAction
}