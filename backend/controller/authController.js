// 引入 formidable @kofeine 2023/02/13 21:59
const formidable = require('formidable');
// 引入 validator @kofeine 2023/02/14 23:14
const validator = require('validator');
// 引入注册model @kofeine 2023/02/15 23:14
const registerModel = require('../models/authModel');
// 在 控制器 验证数据 @kofeine 2023/02/13 21:43

// 获取前端提交的数据字段 @kofeine 2023/02/13 22:00
module.exports.userRegister = (req, res) => {
    // 使用 formidable 接受前端传来的表单数据和文件 @kofeine 2023/02/14 22:35
    const form = formidable({ multiples: true });
    form.parse(req, async (err, fields, files) => {
        console.log(fields)
        console.log(files)

        // 在 parse 方法的回调中对表单数据进行验证 @kofeine 2023/02/14 23:00
        const { userName, email, password, confirmPassword } = fields;
        const { image } = files;

        // 将可能出现的验证错误情况推入一个错误数组中 @kofeine 2023/02/14 23:01
        const error = [];

        // 判空 @kofeine 2023/02/14 23:02
        if (!userName) error.push('Please provide your username');
        if (!email) error.push('Please provide your email');
        if (!password) error.push('Please provide your password');
        if (!confirmPassword) error.push('Please provide your confirmPassword');
        // 判断规则 @kofeine 2023/02/14 23:06
        if (email && !validator.isEmail(email)) error.push('Please provide a valid email address')
        if (password && password.length < 6) error.push('Please provide password that contains at least 6 charactors')
        if (password && confirmPassword && password !== confirmPassword) error.push('Please provide the same confirm password as password ')

        // 判断文件是否为空 获取 files 的键数组的长度，为 0 说明没有图片 @kofeine 2023/02/14 23:25
        if (Object.keys(files).length === 0) error.push('Please provide your user image');

        // 对出现的错误发送相应的 @kofeine 2023/02/15 21:55
        if (error.length > 0) {
            res.status(400).json({
                error: {
                    errorMessage: error
                }
            })
        } else {
            // 没有错误，输出文件名查看 @kofeine 2023/02/15 22:04
            console.log('Origin File Name', files.image.originalFilename);

            // 处理文件名，创建文件路径 @kofeine 2023/02/15 22:48
            const randomNum = Math.random() * 9999;
            const newFileName = files.image.originFilename + randomNum;
            // 前端的公共目录 @kofeine 2023/02/15 22:53
            const filePath = `../../frontend/public/${newFileName}`;

            // 验证邮箱是否被注册 @kofeine 2023/02/15 23:06
            try {
                const isEmailExist = await registerModel.findOne({
                    email: email
                })
                if (isEmailExist) {
                    res.status(404).json({
                        error: {
                            errorMessage: ['Email Already Existed']
                        }
                    })
                }
            } catch (error) {
                res.status(500).json({
                    error: {
                        errorMessage: ['Interval Server Error']
                    }
                })
            }


        }
    })
    console.log("user is registering")
}
