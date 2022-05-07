const mongoose =  require('mongoose')

const MessageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    date: Date,
    type: String
}, { timestamps: true })

module.exports = mongoose.model('Message', MessageSchema)