const messageModel = require('../models/messengerModel');
const formidable = require('formidable');
const fs = require('fs');
const getFriends = async (req, res) => {
    const myId = req.id;
    // console.log('myId', myId);
    const userSchema = require('../models/authModel');
    try {
        const friends = await userSchema.find({});
        const filteredFriends = friends.filter(frd => frd.id !== myId);
        // console.log('filteredFriends', filteredFriends)
        res.status(200).json({
            successMessage: 'successfully get friends',
            friends: filteredFriends
        })
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Interval Server Error']
            }
        })
    }
}

module.exports.sendMessage = async (req, res) => {

    const { senderName, recieverId, message } = req.body;
    const senderId = req.id;
    console.log(message);
    try {
        const messageToSend = await messageModel.create({
            senderId,
            senderName,
            recieverId,
            message: {
                text: message
            }
        })

        res.status(201).json({
            success: true,
            message: messageToSend
        });
    } catch (error) {
        res.status(400).json({
            error: {
                errorMessage: [error]
            }
        })
    }

}
module.exports.getFriends = getFriends;

module.exports.getMessage = async (req, res) => {
    const myId = req.id;
    const frdId = req.params.id;
    // console.log('get Message controller')
    try {
        const allMessages = await messageModel.find({});
        const filteredMessages = allMessages.filter(msg => (msg.senderId === myId && msg.recieverId === frdId) || (msg.senderId === frdId && msg.recieverId === myId))
        res.status(201).json({
            success: true,
            messages: filteredMessages
        })
    } catch (error) {
        res.status(400).json({
            error: {
                errorMessage: [error]
            }
        })
    }
}
module.exports.sendImage = (req, res) => {
    const senderId = req.id;
    const form = formidable({ multiples: true });
    form.parse(req, async (error, fields, files) => {
        const { imageName, senderName, recieverId } = fields;
        // console.log('sendImage controller', files.image);
        const newFilePath = __dirname + '../../../frontend/public/image/' + imageName;
        // console.log(newFilePath)
        // console.log(files.image.filepath)
        console.log(imageName)
        fs.copyFile(files.image.filepath, newFilePath, async (error) => {
            if (error) {
                res.status(500).json({
                    error: {
                        errorMessage: ["Upload Image Fail (Internal Server Error)", error]
                    }
                })
            } else {
                const messageCreated = await messageModel.create({
                    senderId,
                    senderName,
                    recieverId,
                    message: {
                        text: '',
                        image: imageName
                    }
                })

                res.status(201).json({
                    success: true,
                    message: messageCreated
                })

            }
        })
    })
}