const Message = require("../models/Message")

const fetchChatHistory = async (req, res) => {
    const { conversationId, pageNumber, pageSize } = req.query

    const messages = await Message.find({ conversation: conversationId }, null, { sort: { createdAt: -1 }, skip: pageNumber * pageSize, limit: pageSize })
                            .populate('author', '-password -conversations')
    // const conversation = await Conversation.findOne(
    //     { participants: { $all: [
    //         { $elemMatch: { $eq: mongoose.Types.ObjectId(senderId) } },
    //         { $elemMatch: { $eq: mongoose.Types.ObjectId(receiverId) } },
    //     ] } }
    // )
    // .populate({
    //     path: 'messages',
    //     model: 'Message',
    //     options: {
    //         sort: { createdAt: -1 },
    //         skip: pageNumber * pageSize,
    //         limit: pageSize
    //     },
    //     populate: {
    //         path: 'author',
    //         model: 'User',
    //         select: 'username'
    //     }
    // })

    res.status(200).send(messages)
}

exports.controllers = {
    fetchChatHistory
}