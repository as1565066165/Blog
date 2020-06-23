// 引入formidable模块
const formidable = require('formidable');
// 引入path模块
const path = require('path');
// 引入Article构造函数
const { Article } = require('../../model/article');

module.exports = (req, res) => {
    // 1.创建表单解析对象
    const form = new formidable.IncomingForm();
    // 2.设置上传文件的存放位置
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads');
    // 3.是否保留上传文件的后缀  默认是不保留的
    form.keepExtensions = true;
    // 4.解析表单
    form.parse(req, async (err, fields, files) => {
        // err是错误对象 如果表单解析失败 err里面保存的错误信息 如果表单解析成功err为空
        // fields对象类型 保存普通表单的数据
        // files 对象类型 保存了和上传文件相关的数据
        // 将表单数据保存到数据库中
        await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: files.cover.path.split('public')[1],
            content: fields.content
        });
        // 页面重定向到文章列表页
        res.redirect('/admin/article');
    })
}