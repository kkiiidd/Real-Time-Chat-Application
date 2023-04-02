const express = require('express');
const { createServer } = require("http");
const { Server } = require('socket.io');
const cors = require('cors')
const app = express();
const httpServer = createServer(app);

// app.use(cors());
const io = new Server(httpServer, {
    cors: {
        origins: "*",
        methods: ["GET", "POST"],
        credentials: true,
        handlePreflightRequest: (req, res) => {
            res.writeHead(200, {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,POST",
                "Access-Control-Allow-Headers": "my-custom-header",
                "Access-Control-Allow-Credentials": true
            });
            res.end();
        }
    }
})
const users = [];

// 加入新上线的人 @kofeine 032123
const addUser = (socketId, userId, userInfo) => {
    const checkUser = users.some(u => u.userId === userInfo.id);
    console.log(checkUser)
    if (!checkUser) users.push({ socketId, userId, userInfo });
}
// 移除离线的人 @kofeine 032223
const removeUser = (socketId) => {
    users.map((u, index) => {
        u.socketId === socketId && users.splice(index, 1);
    })
}

// 查看朋友是否在线 @kofeine 032223
const findFriend = friendId => users.find(u => u.userId === friendId);

io.on('connection', (socket) => {
    console.log('Socket is connecting');
    socket.on('addUser', (userId, userInfo) => {
        addUser(socket.id, userId, userInfo);
        // console.log('addUser', users);
        console.log('addUser userinfo', userInfo.userName);

        io.emit('getActiveUser', users);
    })
    socket.on('disconnect', () => {
        removeUser(socket.id);
        console.log('Disconnecting', users);
        io.emit('updateUser', users);
    })
    socket.on('sendMessage', (data) => {
        // console.log(data);
        const targetFriend = findFriend(data.recieverId);
        // console.log('target friend', targetFriend)
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('getMessage', data);
        }
    })
    socket.on('isTyping', data => {
        const targetFriend = findFriend(data.recieverId);
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('youAreTyping', data);
        }

    })
    socket.on('stopTyping', data => {
        const targetFriend = findFriend(data.recieverId);
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('youStopTyping', data);
        }
    })

    socket.on('haveRead', data => {
        // console.log(data);
        const targetFriend = findFriend(data.senderId);
        // console.log(targetFriend);
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('yourMsgHasBeenRead', data.recieverId);

        }
    })
    socket.on('addFriend', data => {
        console.log('add friend data:', data);
        const targetFriend = findFriend(data.request.recieverId);
        console.log(users, targetFriend);
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('someoneAddYou', data.request);

        }
    })
    socket.on('addFriendSuccess', data => {
        console.log('add friend data:', data);
        const targetFriend = findFriend(data.friendInfo.friendId);
        console.log('someoneAddYouSuccess', users, targetFriend);
        if (targetFriend) {
            socket.to(targetFriend.socketId).emit('someoneAddYouSuccess', data);

        }
    })

})

httpServer.listen(8000);