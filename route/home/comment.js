// 将评论构造函数进行导入
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
    const { aid, uid, content } = req.body;
    // 将评论信息存储到评论集合中
    await Comment.create({
        aid,
        uid,
        content
    });
    res.redirect('/home/article?id=' + aid);

};