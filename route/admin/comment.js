// 引入Comment构造函数
const { Comment } = require('../../model/comment');
// 引入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
  // 获得当前页码
  const page = req.query.page;
  // 标识 表示当前访问的是评论管理页面
  req.app.locals.currentLink = 'comment';
  // page指定当前页
  // size指定每页显示的数据条数
  // display指定客户端要显示的页码数量
  // exec向数据库中发送查询请求
  // 查询所有评论数据
  let comments = await pagination(Comment).page(page).size(2).display(3).populate('uid').exec();
  // console.log(comments);
  res.render('admin/comment', {
    comments
  });
}