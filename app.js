// 引入express框架
const express = require('express');
// 创建服务器对象
const app = express();
// 引入path模块
const path = require('path');
// 引入gzip压缩模块
const compression = require('compression')
// 引入bodyParser模块
const bodyParser = require('body-parser');
// 引入art-template模块
const template = require('art-template');
// 引入express-session模块
const session = require('express-session');
// 引用dateformat模块
const dateFormat = require('dateformat');
// 引入htmlEncode模块
const htmlEncode = require('./middleware/htmlEncode')
// 引入morgan模块
const morgan = require('morgan');
// 引入config模块
const config = require('config');
// 数据库连接
require('./model/connect');
// 启动压缩
app.use(compression())
// 处理post请求参数
app.use(bodyParser.urlencoded({ extended: false }));
// 配置session
app.use(session({
    resave: false,
    // 设置不保存未初始化的cookie值
    saveUninitialized: false,
    // 加密
    secret: 'secret key',
    cookie: {
        // 设置cookie过期时间
        maxAge: 24 * 60 * 60 * 1000
    }
}));

// 当渲染后缀为art的模板时,使用的模板引擎是什么
app.engine('art', require('express-art-template'));
// 告诉express框架模板的所在位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express模板的默认后缀
app.set('view engine', 'art');
// 想模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;
template.defaults.imports.htmlEncode = htmlEncode;
// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')));
// 设置favicon请求默认路径
const favicon = require('serve-favicon')
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

console.log(config.get('title'));

// 获得系统环境变量 返回值是一个对象
if (process.env.NODE_ENV == 'develoment') {
    // 当前是开发环境
    console.log('当前是开发环境');
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'));
} else {
    // 当前是生产环境
    console.log('当前是生产环境');

};


// 引入路由对象
const home = require('./route/home');
const admin = require('./route/admin');
const artTemplate = require('art-template');

// 拦截请求判断用户的登录状态
app.use('/admin', require('./middleware/loginGuard'));


// 为路由匹配请求路径
app.use('/', home);
app.use('/home', home);
app.use('/admin', admin);

// 错误处理
app.use((err, req, res, next) => {
    // 将字符串转换为对象 JSON.parse()
    console.log(err);

    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})
// 监听端口
app.listen(5555);
console.log('网站服务器启动成功,请访问localhost:5555');
