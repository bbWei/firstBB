const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/myBlog',{ useUnifiedTopology: true, useNewUrlParser: true })
.then(()=>{console.log('数据库连接成功')})
.catch(()=>{console.log('数据库连接失败')});
