const mongoose =  require('mongoose')

const MessageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    content: String,
    conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }
}, { timestamps: true })

module.exports = mongoose.model('Message', MessageSchema)