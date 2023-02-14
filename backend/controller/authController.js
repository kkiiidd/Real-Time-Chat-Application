// 引入 formidable @kofeine 2023/02/13 21:59
const formidable = require('formidable');
// 引入 validator @kofeine 2023/02/14 23:14
const validator = require('validator');
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

    })
    console.log("user is registering")
}
