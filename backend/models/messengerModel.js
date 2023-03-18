const { model, Schema } = require('mongoose');

const messageSchema = new Schema({
    senderId: {
        type: String,
        require: true
    },
    recieverId: {
        type: String,
        require: true
    },
    senderName: {
        type: String,
        require: true
    },
    message: {
        text: {
            type: String,
            default: ''
        },
        image: {
            type: String,
            default: ''
        }

    },
    status: {
        type: Boolean,
        default: false
    }
})

module.exports = model('message', messageSchema);