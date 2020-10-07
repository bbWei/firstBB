module.exports = (req,res) => {
    req.session.destroy(function(){
        // 删除cookie   
        // connect.sid 是在浏览器的cookie列表中显示的
		res.clearCookie('connect.sid');
		// 重定向到用户登录页面
		res.redirect('/admin/login');
		// 清除模板中的用户信息
		req.app.locals.userInfo = null;
    })
}