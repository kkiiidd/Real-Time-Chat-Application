const { model, Schema } = require('mongoose');

const friendSchema = new Schema({
    friendsId: {
        type: Array,
        default: []
    }
}, { timestamps: true })

module.exports = model('friend', friendSchema)