const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})
const users = [];
let isTyping = false;

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
        // console.log(users);
        io.emit('getUser', users);
    })
    socket.on('disconnect', () => {
        removeUser(socket.id);
        io.emit('updateUser', users);
        // console.log(users);
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


})