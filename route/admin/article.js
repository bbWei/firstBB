// 将文章集合的构造函数导入到当前文件中
const { Article } = require('../../model/article');
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 标识 标识当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    const page = req.query.page;
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库中发送查询请求
    // 查询所有文章数据
    let articles = await pagination(Article).find().page(page).size(5).display(3).exec();

    // res.send(articles)
    // return;


    // 渲染文章列表页面模板
    res.render('admin/article', {
        articles: articles
    });
}



/* {
    "page": 1,
    "size": 2,
    "total": 1,
    "records": [{
        "cover": "\\uploads\\upload_ed0c7b03e88a081286b4cc77186f5d80.jpg", "_id": "5f5a5a7baded1d38fcb337d9",
        "title": "测试111111111",
        "author": {
            "state": 0,
            "_id": "5f5850080d17f35074f0eed1",
            "username": "radish",
            "email": "radish@qq.com",
            "password": "$2b$10$YPIdkRPhxIrBkH4clrebheDeffZg/aEa7.3vDiqDrYw6RQTvuW9bK",
            "role": "admin",
            "__v": 0
        },
        "publishDate": "2020-09-08T00:00:00.000Z",
        "content": "测试111111111111",
        "__v": 0
    }],
    "pages": 1,
    "display": [1]
} */