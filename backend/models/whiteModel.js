const { Schema, model } = require('mongoose');


const whiteSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    token: {
        type: String,
        require: true
    },
    expireAt: { type: Date, expires: 6000 }

}, { timestamps: true })

module.exports = model("white", whiteSchema);