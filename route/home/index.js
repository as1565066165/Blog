// 引入Article构造函数
const { Article } = require('../../model/article');
// 引入分页模块
const pagination = require('mongoose-sex-page');
module.exports = async (req, res) => {
    let page = req.query.page;
    let result = await pagination(Article).page(page).size(4).display(5).populate('author').exec();
    res.render('home/default', {
        result
    });
}