// 引入article构造函数
const { Article } = require('../../model/article');
// 将评论构造函数进行导入
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    // 接受客户端传递出来的文章id值
    const id = req.query.id;
    // 根据id值查询文章详细信息
    let article = await Article.findOne({ _id: id }).populate('author');
    let comments = await Comment.find({ aid: id }).populate('uid');
    res.render('home/article', {
        article,
        comments
    });
};