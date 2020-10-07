// 导入用户集合构造函数
const { User } = require('../../model/user');
// 导入bcrypt模块 加密
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    // res.send(req.body);
    // 接收请求参数
    const {email, password} = req.body;

    if (email.trim().length == 0 || password.trim().length == 0) {
        return res.status(400).render('admin/login',{msg: '邮件地址或者密码错误'});
    }

    let user = await User.findOne({email});

    if (user) {
        let isValid = await bcrypt.compare(password, user.password);
        if ( isValid ) {
			// 将用户名存储在请求对象中
            req.session.username = user.username;
            
			// 将用户角色存储在session对象中
            req.session.role = user.role;
            
            // 登录成功的话就把用户信息存储在app.locals里面 userInfo就是用户的信息 这样就可以在模板中直接拿到用户信息
            // 这里不需要引入app，因为在req下面有一个app属性，这个app属性就是在app.js中创建出来的
            req.app.locals.userInfo = user;

            if (user.role == 'admin') {
				// 重定向到用户列表页面
				res.redirect('/admin/user');
			} else {
                // 没有查询到用户
                res.status(400).render('admin/login', {msg: '邮箱地址或者密码错误'})
            }
        } else {
            // 没有查询到用户
            res.status(400).render('admin/login', {msg: '邮箱地址或者密码错误'})
        }
    }
}