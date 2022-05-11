const mongoose =  require('mongoose')

const recipientSchema = new mongoose.Schema({
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    status: { type: String, default: 'Pending' }
})

const InvitationSchema = new mongoose.Schema({
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    recipients: [recipientSchema],
    groupName: String
}, { timestamps: true })

module.exports = mongoose.model('Invitation', InvitationSchema)