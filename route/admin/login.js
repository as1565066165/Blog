// 引入bcrypt数据加密模块
const bcrypt = require('bcryptjs');
// 引入User集合的构造函数
const { User } = require('../../model/user');

module.exports = async (req, res) => {
    // 接受请求参数 用到对象解构
    const { email, password } = req.body;
    // 服务器端验证  避免浏览器禁用JavaScript解析,而进入管理页面
    if (email.trim().length == 0 || password.trim().length == 0) return res.status(400).render('admin/error', { msg: '邮箱地址或密码错误' });

    // 根据邮箱地址查询用户信息
    // 如果查询到了用户 user变量的值是对象类型 对象中存储的是用户信息
    // 如果没有查询到用户 user变量为空
    let user = await User.findOne({ email });
    if (user) {
        // 将客户端传递的密码和用户信息比对
        // isValid true 比对成功
        // isValid false 比对失败
        let isValid = await bcrypt.compare(password, user.password);
        if (isValid) {
            // 登录成功
            // 将用户名存储在请求对象中
            req.session.username = user.username;
            // 将用户的角色存储在请求对象中
            req.session.role = user.role;
            // res.send('登录成功');
            req.app.locals.userInfo = user;
            // 重定向到用户列表页面express框架给我们提供的方法
            // 就不用res.writeHead({ Location })进行重定向了
            // 对用户角色进行判断
            if (user.role == 'admin') {
                // 如果是超级管理员就重定向为用户管理页面
                res.redirect('/admin/user');
            } else {
                // 如果是普通用户就重定向为文章列表页
                res.redirect('/home/');
            }

        } else {
            // 如果密码比对不成功
            res.status(400).render('admin/error', {
                msg: '邮箱地址或密码错误'
            });
        }
    } else {
        // 没有查询到用户
        res.status(400).render('admin/error', {
            msg: '邮箱地址或密码错误'
        });
    }
};
