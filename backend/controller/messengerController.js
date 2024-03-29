const messageModel = require('../models/messengerModel');
const formidable = require('formidable');
const fs = require('fs');
const authModel = require('../models/authModel');
const requestModel = require('../models/requestModel');
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
        const me = await userSchema.findOne({
            _id: {
                $eq: myId
            }
        }).populate("friends", "-friends");
        const friends = me.friends;

        let friendsInfo = [];
        console.log('friends !!!!!!!!!!!!!!!!!!!!!!!', friends);
        for (let i = 0; i < friends.length; i++) {
            const lastMessage = await findLastMessage(myId, friends[i]._id);
            const unseenMessages = await findUnseenMessages(myId, friends[i]._id) || [];
            // console.log('lastMessage', lastMessage)
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

module.exports.addRequest = async (req, res) => {
    try {
        const { myInfo, targetUser, intro } = req.body;
        if (!intro) {
            res.status(400).json({
                error: {
                    errorMessage: 'Please enter Inroduction'
                }
            })
        } else {
            const newRequest = await requestModel.create({
                senderName: myInfo.userName,
                senderId: myInfo.id,
                senderImage: myInfo.image,
                recieverId: targetUser.info._id,
                recieverName: targetUser.info.userName,
                recieverImage: targetUser.info.image,
                introduction: intro,
                status: 'pending'
            })
            res.status(201).json({
                success: true,
                request: newRequest
            })

        }

        // console.log('recieverId', req.body);
        // res.status(201).json({
        //     reqbody: req.body
        // });
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                errorMessage: "Internal Server Error"
            }
        })
    }
}
module.exports.getRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const allRequests = await requestModel.find({
            $or: [
                {
                    senderId: {
                        $eq: id
                    }
                },
                {
                    recieverId: {
                        $eq: id
                    }
                }
            ]
        }).sort({
            createdAt: -1
        })
        res.status(201).json({
            succes: true,
            allRequests
        })
        // console.log('allRequest', id, allRequest);
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                errorMessage: "Internal Server Error"
            }
        })
    }
}

module.exports.addFriend = async (req, res) => {
    const { reqId, myId, friendId } = req.body;
    try {
        console.log('add friend', reqId, myId, friendId);
        const result = await requestModel.updateMany({
            $or: [{
                $and: [
                    {
                        recieverId: {
                            $eq: myId
                        },
                    },
                    {
                        senderId: {
                            $eq: friendId
                        }
                    }
                ]

            }, {
                $and: [{
                    recieverId: {
                        $eq: friendId
                    }

                }, {
                    senderId: {
                        $eq: myId
                    }
                }]
            }]
        }, {
            status: 'accept'
        })
        console.log('result:', result);
        // 修改我的朋友列表 @kofeine 032923
        await authModel.findByIdAndUpdate(myId, {
            $addToSet: {
                friends: friendId
            }
        })
        // 修改好友的朋友列表 @kofeine 032923
        await authModel.findByIdAndUpdate(friendId, {
            $addToSet: {
                friends: myId
            }
        })

        // 把当前添加的朋友返回去,展示在朋友列表中 @kofeine 032923
        const friend = await authModel.findOne({
            _id: {
                $eq: friendId
            }
        }, "-friends");
        let friendInfo;

        const lastMessage = await findLastMessage(myId, friendId);
        const unseenMessages = await findUnseenMessages(myId, friendId) || [];

        friendInfo = {
            lastMessage,
            unseenMessages,
            info: friend
        }

        res.status(201).json({
            success: true,
            friend: friendInfo
        });
    } catch (error) {
        res.status(500).json({
            error: {
                code: 500,
                errorMessage: ["Internal Server Error", error]
            }
        })
    }
}
module.exports.addMoment = (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        const { content } = fields;
        console.log(content, files);
    });
}