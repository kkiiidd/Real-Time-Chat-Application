const { model, Schema } = require('mongoose');

const requestSchema = new Schema({
    senderId: {
        type: String,
        require: true
    },
    senderName: {
        type: String,
        require: true
    },
    senderImage: {
        type: String,
        require: true
    },
    recieverId: {
        type: String,
        require: true
    },
    recieverName: {
        type: String,
        require: true
    },
    recieverImage: {
        type: String,
        require: true
    },
    introduction: {
        type: String,
        require: true

    },
    status: {
        type: String,
        default: 'pending'
    }
}, { timestamps: true })

module.exports = model('request', requestSchema)