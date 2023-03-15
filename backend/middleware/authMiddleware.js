const jwt = require('jsonwebtoken');
// 处理 req 的中间件，将 token 解密出来的 id 赋给 req.id，用于过滤朋友列表 @kofeine 031523
module.exports.authMiddleware = async (req, res, next) => {
    // console.log('cookies:', req.cookies);
    const { authToken } = req.cookies;
    if (authToken) {
        tokenDecoded = jwt.verify(authToken, process.env.SECRET)
        req.id = tokenDecoded.id;
        // 继续发送请求 @kofeine 031523
        next();
    } else {
        // 不存在 token ，返回错误信息 @kofeine 031523
        res.status(400).json({
            error: {
                errorMessage: ['Please Login']
            }
        })
    }
}