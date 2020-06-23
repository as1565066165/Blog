// 引入formidable模块
const formidable = require('formidable');
// 引入path模块
const path = require('path');
// 引入Article构造函数
const { Article } = require('../../model/article');
// 文件模块
const fs = require('fs');

module.exports = async (req, res, next) => {
    // 获取get参数的id值
    const id = req.query.id;
    // 根据id在数据库中查询文章信息
    let article = await Article.findOne({ _id: id }).populate('author');
    const isValid = req.session.username == article.author.username ? true : false;
    // 如果登录用户和发布文章的用户相同
    if (isValid) {
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
            // 进行作者比对 返回的是一个布尔值
            let filePath = path.join(__dirname, '../', '../', 'public', article.cover);
            let cover = '';
            if (files.cover.size != 0) {
                cover = files.cover.path.split('public')[1];
                fs.unlinkSync(filePath);
            } else {
                cover = article.cover;
            }

            await Article.findOneAndUpdate({ _id: id }, {
                title: fields.title,
                author: fields.author,
                publishDate: fields.publishDate,
                cover,
                content: fields.content
            });

            // 页面重定向到文章列表页
            res.redirect('/admin/article');
        })
    } else {
        // 用户比对失败
        let obj = { path: '/admin/article-edit', message: '亲~不是自己写的文章不能进行修改哦！', id: id };
        next(JSON.stringify(obj));
    }
}