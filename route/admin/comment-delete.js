// 引入评论构造函数
const { Comment } = require('../../model/comment');
module.exports = async (req, res) => {
  // 获取删除评论的id
  const id = req.query.id;
  // 完善之后再说

  /* // 根据id在数据库中查询用户信息
  let article = await Article.findOne({ _id: id }).populate('author');
  const isValid = req.session.username == article.author.username ? true : false; */

  // 根据id删除评论
  await Comment.findOneAndDelete({ _id: id });
  // 将页面重定向为评论列表页面
  res.redirect('/admin/comment');
}