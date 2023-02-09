const express = require('express');
const app = express();

// 引入dotenv @kofeine 2023/02/09 22:48
const dotenv = require('dotenv');
const databaseConnect = require('./config/database');
const { authRouter } = require('./routes/authRouter');
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

app.use('/api/messenger', authRouter);
app.get('/', (req, res) => {
    res.send('Welcom to my RealTimeChat App')
})
app.listen(PORT, () => {
    console.log(`Server is runnig on port ${PORT}`);
})