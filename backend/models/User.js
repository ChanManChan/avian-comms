const mongoose =  require('mongoose')

const UserSchema = new mongoose.Schema({
    mail: { type: String, unique: true, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation' }]
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)