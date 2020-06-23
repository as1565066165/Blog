// 引入User构造函数
const { Article } = require('../../model/article');
// 引入path模块
// const path = require('path');
module.exports = async (req, res) => {
    // 标识 表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';
    const { message, id } = req.query;
    // 如果url传递了id
    if (id) {
        // 修改操作
        let article = await Article.findOne({ _id: id }).populate('author');
        // 渲染用户编辑页面(用户信息的修改操作)
        // let filePath = path.join(__dirname, '../', '../', 'public', article.cover);
        res.render('admin/article-edit', {
            message,
            article,
            // filePath,
            link: '/admin/article-modify?id=' + id,
            button: '修改'
        });
    } else {
        // 添加操作
        res.render('admin/article-edit', {
            message,
            link: '/admin/article-add',
            button: '发布'
        });
    }
}