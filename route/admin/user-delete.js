// 引入User构造函数
const { User } = require('../../model/user');
module.exports = async (req, res) => {
    // 删除用户的id
    const id = req.query.id;
    // 根据id删除用户
    await User.findOneAndDelete({ _id: id });
    // 将页面重定向为用户列表页面
    res.redirect('/admin/user');
}