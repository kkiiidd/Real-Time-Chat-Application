const messageModel = require('../models/messengerModel');

const getFriends = async (req, res) => {
    const myId = req.id;
    console.log('myId', myId);
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