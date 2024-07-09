const mongoose = require("mongoose");

//1. chat Schema
const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true
    },
});

//2. Creating model name: Chat, collection name: chats
const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
