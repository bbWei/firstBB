// 导入用户集合构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {

    // 标识 标识当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 若没有传入页码 默认为1
    let page = req.query.page || 1;
    let pagesize = 5;
    let count = await User.countDocuments({});
    let totle = Math.ceil(count / pagesize);

    let start = (page - 1) * pagesize;

    let users = await User.find({}).limit(pagesize).skip(start);

    // res.send(totle);
    // return
    res.render('admin/user', {
        users: users,
        totle: totle,
        page: page
    })
}

