// 引入model和schema @kofeine 2023/02/12 22:06

const { model, Schema } = require("mongoose");


const registerSchema = new Schema({
    // 定义集合字段 @kofeine 2023/02/12 22:07
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });


module.exports = model('user', registerSchema);

