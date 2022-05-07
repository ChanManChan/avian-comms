const { default: mongoose } = require("mongoose")
const Conversation = require("../models/Conversation")

const fetchChatHistory = async (req, res) => {
    const { senderId, receiverId, pageNumber, pageSize } = req.query

    const conversation = await Conversation.findOne(
        { participants: { $all: [
            { $elemMatch: { $eq: mongoose.Types.ObjectId(senderId) } },
            { $elemMatch: { $eq: mongoose.Types.ObjectId(receiverId) } },
        ] } }
    )
    .populate({
        path: 'messages',
        model: 'Message',
        options: {
            sort: { createdAt: -1 },
            skip: pageNumber * pageSize,
            limit: pageSize
        },
        populate: {
            path: 'author',
            model: 'User',
            select: 'username'
        }
    })

    res.status(200).send(conversation)
}

exports.controllers = {
    fetchChatHistory
}