const messageModel = require('../models/messengerModel');
const formidable = require('formidable');
const fs = require('fs');
const authModel = require('../models/authModel');
const findLastMessage = async (myId, frdId) => {
    try {
        const lastMessage = await messageModel.findOne({
            $or: [{
                $and: [{
                    senderId: {
                        $eq: myId
                    }
                }, {
                    recieverId: {
                        $eq: frdId
                    }

                }]
            }, {
                $and: [
                    {
                        senderId: {
                            $eq: frdId
                        }
                    }, {
                        recieverId: {
                            $eq: myId
                        }
                    }
                ]
            }]

        }).sort({
            createdAt: -1
        })
        // console.log('last message', lastMessage)
        return lastMessage;
    } catch (error) {
        console.log('find error');
        return '';
    }




}
// 我未读的信息 @kofeine 032423
const findUnseenMessages = async (myId, friendId) => {
    try {
        const unseenMessages = await messageModel.find({
            $and: [
                {
                    senderId: {
                        $eq: friendId
                    }
                },
                {
                    recieverId: {
                        $eq: myId
                    }
                }, {
                    status: {
                        $eq: false
                    }
                }
            ]
        })
        return unseenMessages;

    } catch (error) {
        console.log('find unseen messages error:', error)
        return null;
    }
}
const getFriends = async (req, res) => {
    const myId = req.id;
    // console.log('myId', myId);
    const userSchema = require('../models/authModel');
    try {
        const friends = await userSchema.find({
            _id: {
                $ne: myId
            }
        });
        // const filteredFriends = friends.filter(frd => frd.id !== myId);
        const filteredFriends = friends
        // console.log('filteredFriends', filteredFriends)
        let friendsInfo = [];
        // console.log('friends', friends);
        for (let i = 0; i < friends.length; i++) {
            const lastMessage = await findLastMessage(myId, friends[i]._id);
            const unseenMessages = await findUnseenMessages(myId, friends[i]._id) || [];
            console.log('lastMessage', lastMessage)
            friendsInfo = [...friendsInfo, {
                lastMessage,
                unseenMessages,
                info: friends[i]
            }]
        }
        res.status(201).json({
            successMessage: 'successfully get friends',
            friends: friendsInfo
        })
    } catch (error) {
        res.status(500).json({
            error: {
                errorMessage: ['Here Interval Server Error', error]
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
        const filteredMessages = await messageModel.find({
            $or: [{
                $and: [{
                    senderId: {
                        $eq: myId
                    }
                }, {
                    recieverId: {
                        $eq: frdId
                    }

                }]
            }, {
                $and: [
                    {
                        senderId: {
                            $eq: frdId
                        }
                    }, {
                        recieverId: {
                            $eq: myId
                        }
                    }
                ]
            }]

        });
        // const filteredMessages = allMessages.filter(msg => (msg.senderId === myId && msg.recieverId === frdId) || (msg.senderId === frdId && msg.recieverId === myId));
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

module.exports.seenAll = async (req, res) => {
    try {
        const targetMessages = await findUnseenMessages(req.id, req.params.id);
        console.log('my all unseen messages', req.id, req.params.id, targetMessages);
        // await (targetMessages.map(async (msg) => {
        //     await messageModel.findByIdAndUpdate(msg._id, {
        //         status: true
        //     })
        // }))
        await messageModel.find({
            $and: [
                {
                    senderId: {
                        $eq: req.params.id
                    }
                },
                {
                    recieverId: {
                        $eq: req.id
                    }
                }, {
                    status: {
                        $eq: false
                    }
                }
            ]
        }).update({
            status: true
        })
        const targetMessages2 = await findUnseenMessages(req.id, req.params.id);
        console.log(targetMessages2)
        res.status(201).json({
            success: true,
            unseenMessages: targetMessages2
        })



    } catch (error) {
        console.log('seen All error', error)
    }
}
module.exports.getTargetUser = async (req, res) => {
    console.log('target email', req.params.email);
    try {
        const targetUser = await authModel.findOne({
            email: req.params.email
        })
        if (targetUser) {
            const { userName, email, image, _id } = targetUser;
            res.status(201).json({
                success: true,
                targetUser: {
                    userName, email, image, _id
                }
            })
        }
        else {
            res.status(400).json({
                error: {
                    code: 400,
                    errorMessage: 'target user not found'
                }
            })
        }
    } catch (error) {

        console.log('model find target user error', error);
        res.status(500).json({
            error: {
                code: 500,
                errorMessage: "Internal Server Error"
            }
        })
    }
}