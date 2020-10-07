const { User } = require('../../model/user');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {
    const { username, email, role, state, password } = req.body;
    const id = req.query.id;
    let user = await User.findOne({_id: id});

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
        await User.updateOne({ _id: id }, {
            username: username,
            email: email,
            role: role,
            state: state
        });
        res.redirect('/admin/user');
    }else{
        let obj = {path: '/admin/user-edit', message: '密码错误', id: id}
		next(JSON.stringify(obj));
    }
}