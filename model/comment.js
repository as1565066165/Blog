// 引入mongoose模块
const mongoose = require('mongoose');
const { date } = require('joi');
// 创建评论集合规则
const commentSchema = new mongoose.Schema({
    // 文章id
    aid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    // 用户id
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: {
        type: Date,
        default: Date.now()
    },
    content: {
        type: String
    }
});
// 根据评论规则创建评论集合
const Comment = mongoose.model('Comment', commentSchema);
// 将评论集合作为模块成员进行导出
module.exports = {
    Comment
};