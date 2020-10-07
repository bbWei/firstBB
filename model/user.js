const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcrypt');
// 引入joi模块  JavaScript对象的规则描述语言和验证器
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [2, '字数不符合规则'],
        maxlength: [10, '字数超出限制']
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);

// 对密码进行加密
// async function createUser() {
//     const salt = await bcrypt.genSalt(10);
//     const pass = await bcrypt.hash('123456', salt);
//     const user = await User.create({
//         username: 'radish',
//         email: 'radish@163.com',
//         password: pass,
//         role: 'admin',
//         state: 0
//     });
// }
// createUser();

// User.create({
//     username:'radish02',
//     email:'radish02@163.com',
//     password:'000222',
//     role:'normal',
//     state:'0'
// }).then(()=>{
//     console.log('用户创建成功');
// }).catch(()=>{
//     console.log('用户创建失败');
// })

// 验证用户信息
const validateUser = user => {
    // 定义对象的验证规则
    const schema = {
        username: Joi.string().min(2).max(12).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合要求')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().error(new Error('密码格式不符合要求')),
        role: Joi.string().valid('normal', 'admin').required().error(new Error('角色值非法')),
        state: Joi.number().valid(0, 1).required().error(new Error('状态值非法'))
    };

    // 实施验证
    return Joi.validate(user, schema);
}

// 将用户集合做为模块成员进行导出
module.exports = {
    User,
    validateUser
}