// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入加密模块
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    try {
        await validateUser(req.body)
    } catch (e) {
        // return res.redirect(`/admin/user-edit?message=${e.message}`);
        // 调用next()就会触发错误处理中间件
        // next只能传递一个参数 必须是字符串类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: e.message }));
    }

    let user = await User.findOne({ email: req.body.email });
    // redirect 自带res.end
    if (user) {
        // return res.redirect(`/admin/user-edit?message=邮箱地址已被占用`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被占用' }))
    }

    // 加密
    const salt = await bcrypt.genSalt(10);

    const password = await bcrypt.hash(req.body.password, salt);

    req.body.password = password;

    // 加入数据库
    await User.create(req.body);

    // 重定向回用户列表
    res.redirect('/admin/user')

}