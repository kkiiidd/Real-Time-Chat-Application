const express = require('express');
// const helmet = require('helmet');
const fs = require('fs');
const https = require('https');
const app = express();

// 引入dotenv @kofeine 2023/02/09 22:48
const dotenv = require('dotenv');
const databaseConnect = require('./config/database');
const authRouter = require('./routes/authRouter');
const messengerRouter = require('./routes/messengerRouter');
// 为了读取请求的请求体，引入bodyParser @kofeine 031123
const bodyParser = require('body-parser');
//为了读取请求的 cookie ,引入 cookie-parser;
const cookieParser = require('cookie-parser');
// dotenv配置 @kofeine 2023/02/09 22:50
/*    
    dotenv在项目中的作用：将环境变量从 .env 文件加载到中 process.env
    好处：
    1. 统一管理各个环境下的全局变量
    2. 方便切换环境
*/
dotenv.config({
    path: './config/config.env'
})
databaseConnect();
//初始化端口号 @kofeine,2023-01-28-14:53:09
const PORT = process.env.PORT || 5000;


// 配置 https @kofeine 033123
const privateKey = fs.readFileSync('privatekey.pem');
const certificate = fs.readFileSync('certificate.pem');
const httpsOptions = {
    key: privateKey,
    cert: certificate
};


app.use(bodyParser.json());
app.use(cookieParser("hayes"));
app.use('/api/chatapp', authRouter);
app.use('/api/chatapp', messengerRouter);

app.get('/', (req, res) => {
    res.send('Welcom to my RealTimeChat App')
})
// app.listen(PORT, () => {
//     console.log(`Server is runnig on port ${PORT}`);
// })

https.createServer(httpsOptions, app).listen(PORT, function () {
    console.log(`Server is runnig on port ${PORT} (Https)`);
});