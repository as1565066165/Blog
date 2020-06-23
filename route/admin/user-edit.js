// 引入User构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {

    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    // 如果url传递了id
    if (id) {
        // 修改操作
        let user = await User.findOne({ _id: id });
        // 渲染用户编辑页面(用户信息的修改操作)
        res.render('admin/user-edit', {
            message,
            user,
            link: '/admin/user-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/user-edit', {
            message,
            link: '/admin/user-edit',
            button: '添加'
        });
    }

};