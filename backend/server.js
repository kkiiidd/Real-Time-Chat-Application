const express = require('express');
const app = express();

//初始化端口号 @kofeine,2023-01-28-14:53:09
const PORT  =  process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send('Welcom to my RealTimeChat App')
})
app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`);
})