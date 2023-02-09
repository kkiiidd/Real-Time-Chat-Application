const mongoose = require('mongoose');

// 创建数据库连接函数 @kofeine 2023/02/09 22:34
const databaseConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        // 数据库连接成功回调 @kofeine 2023/02/09 22:35
        console.log("MongoDB Database Connected");
    }).catch(err => {
        // 数据库连接失败回调 @kofeine 2023/02/09 22:37
        console.log(err);
    })
}

module.exports = databaseConnect;