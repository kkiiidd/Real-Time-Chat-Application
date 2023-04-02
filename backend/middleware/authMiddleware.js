const jwt = require('jsonwebtoken');
const whiteModel = require('../models/whiteModel');
// 处理 req 的中间件，将 token 解密出来的 id 赋给 req.id，用于过滤朋友列表 @kofeine 031523

const checkInWhiteList = async (token) => {
    const isIn = await whiteModel.findOne({
        token
    })
    return isIn ? true : false;
}
module.exports.authMiddleware = async (req, res, next) => {
    // console.log('cookies:', req.cookies);
    const { authToken } = req.cookies;
    if (authToken) {

        try {
            const checkInWhite = await checkInWhiteList(authToken)
            if (checkInWhite) {
                console.log('In whitelist')
                tokenDecoded = jwt.verify(authToken, process.env.SECRET)
                req.id = tokenDecoded.id;
                // 继续发送请求 @kofeine 031523
                next();
            } else {
                console.log('Not in whitelist')

                // token已不在白名单 ，返回错误信息 @kofeine 031523
                res.status(401).cookie("authToken", "").json({
                    error: {
                        errorMessage: ['Invalid Token :(']
                    }
                })
            }

        } catch (error) {
            res.status(401).cookie("authToken", "").json({
                error: {
                    errorMessage: ['Invalid Token :(', error]
                }
            })
        }

    } else {
        // 不存在 token ，返回错误信息 @kofeine 031523
        res.status(401).cookie("authToken", "").json({
            error: {
                errorMessage: ['Invalid Token :(']
            }
        })
    }
}