// 引入User构造函数
const { User } = require('../../model/user');
// 渲染user页面
module.exports = async (req, res) => {
    // 标识 表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';

    // 接受客户端传递的当前页的参数
    let page = req.query.page || 1;
    // 每一页显示的数据个数
    let pageSize = 5;
    // 查询数据的总数
    let count = await User.countDocuments({});
    // 总页数
    let total = Math.ceil(count / pageSize);
    // 页码对应的查询位置
    let start = (page - 1) * pageSize;

    // 从数据库中查询用户信息
    let users = await User.find({}).limit(pageSize).skip(start);
    // res.send(users);
    res.render('admin/user', {
        users,
        page,
        total,
        count
    });
};