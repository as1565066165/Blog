// 引入用户集合的构造函数
const { User, validateUser } = require('../../model/user');
// 引入bcrypt模块
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    // 实施验证
    try {
        await validateUser(req.body);
    } catch (error) {
        //   验证没有通过
        // return res.redirect(`/admin/user-edit?message=${error.message}`);
        // JSON.stringify()用来将对象类型转换为字符串类型
        return next(JSON.stringify({ path: '/admin/user-edit', message: error.message }));
    }
    // 根据邮箱地址查找数据库中的用户是否存在
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        //   如果用户存在  
        // return res.redirect(`/admin/user-edit?message=邮箱地址已经被注册`);
        return next(JSON.stringify({ path: '/admin/user-edit', message: '邮箱地址已经被注册' }));
    }
    // 对密码进行加密处理
    // 生成随机字符串
    const salt = await bcrypt.genSalt(10);
    // 加密密码
    const password = await bcrypt.hash(req.body.password, salt);
    // 把密码替换加密密码
    req.body.password = password;
    // 将用户信息添加到数据库中
    User.create(req.body);
    // 将用户重定向到用户列表页面
    res.redirect('/admin/user');



}