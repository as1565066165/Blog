// 引入User构造函数
const { User } = require('../../model/user');
// 引入bcrypt密码加密模块
const bcrypt = require('bcryptjs');
module.exports = async (req, res, next) => {
    // 获得post请求参数
    const { username, email, password, role, state } = req.body;
    // 获得要修改信息的用户id
    const id = req.query.id;
    // 根据id在数据库中查询用户信息
    let user = await User.findOne({ _id: id });
    // 进行密码比对 返回的是一个布尔值
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        // 如果密码比对成功
        // 将用户信息更新到数据库中
        await User.updateOne({ _id: id }, {
            username,
            email,
            role,
            state
        });
        // 将页面重定向为用户列表页面
        res.redirect('/admin/user');
    } else {
        // 密码比对失败
        let obj = { path: '/admin/user-edit', message: '密码比对失败,不能进行用户信息的修改', id: id };
        next(JSON.stringify(obj));
    }
}