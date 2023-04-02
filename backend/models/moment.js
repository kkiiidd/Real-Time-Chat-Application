const { Schema, model } = require('mongoose');

const momentSchema = new Schema({
    userId: {
        type: String,
        require: true
    },
    images: [{
        type: String
    }],
    content: {
        type: String
    }

}, { timestamps: true })

module.exports = model("moment", momentSchema);