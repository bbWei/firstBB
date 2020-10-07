// 引入express 用于创建web服务器
const express = require('express');
// path 用于拼接路径
const path = require('path');
// 引入body-parser模块 用来处理post请求参数
const bodyPaser = require('body-parser');
// 导入express-session模块 保存登录状态
const session = require('express-session');
// 导入art-tempate模板引擎
const template = require('art-template');
// 导入dateformat第三方模块
const dateFormat = require('dateformat');
// 导入morgan这个第三方模块
const morgan = require('morgan');
// 导入config模块 允许开发人员将不同运行环境下的应用配置信息抽离到单独的文件中
const config = require('config');

const cookieParase = require('cookie-parser');

// 创建网站服务器
const app = express();
// 数据库连接
require('./model/connect');

app.use(cookieParase());

// 处理post请求参数
// extended: false 方法内部使用 querystring 模块处理请求参数的格式
// extended: true 方法内部使用第三方模块qs处理请求参数的格式
app.use(bodyPaser.urlencoded({extended: false}));


// 配置session
app.use(session({
	secret: 'secret key',
	// saveUninitialized  即保存一个未初始化的cookie
	// 即客户端访问服务器端时  无论是否登录  都先存一个cookie
	// 在这里不希望存储无意义的cookie  所以false
	saveUninitialized: false,
	// 过期时间 以毫秒为单位  这里设置为24小时
	cookie: {
		maxAge: 24 * 60 * 60 * 1000
	}
}));


// 告诉express框架模板所在的位置
// 1.第一个views 模板存放的位置
// 2.第二个views 文件夹的名字
app.set('views', path.join(__dirname, 'views'));
// 渲染模板时不写后缀 默认拼接art后缀
// 1.模板配置项名称 2.后缀的名字
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 使用 express-art-template
// 1.模板的后缀  2.指定使用的模板引擎
app.engine('art', require('express-art-template'));

// 向模板内部导入dateFormate变量
template.defaults.imports.dateFormat = dateFormat;

// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

console.log(config.get('title'))

// 获取系统环境变量 返回值是对象 
if (process.env.NODE_ENV == 'development') {
	// 当前是开发环境
	console.log('当前是开发环境')
	// 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
	app.use(morgan('dev'))
} else {
	// 当前是生产环境
	console.log('当前是生产环境')
}


// 引入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断登录状态
// 中间件是有顺序的 从上到下依次匹配 这里必须在匹配路由之前
app.use('/admin', require('./middleware/loginGuard'));

// 为路由匹配请求路径
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err,req,res,next)=>{
	// 将字符串转换为对象类型
	const result = JSON.parse(err);

	let params = [];
	for(let attr in result){
		if(attr != 'path'){
			params.push(attr + '=' + result[attr])
		}
	}
	res.redirect(`${result.path}?${params.join('&')}`);
})

app.listen(80);
console.log('服务器连接成功');
