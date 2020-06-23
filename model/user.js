// 创建用户集合
// 引入mongoose模块
const mongoose = require('mongoose');
// 导入bcrypt
const bcrypt = require('bcryptjs');
// 引入joi模块
const Joi = require('joi');
// 创建集合规则
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        // 保证邮箱地址在插入数据库时不重复
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    // admin 超级管理员
    // normal 普通用户
    role: {
        type: String,
        required: true,
        trim: true
    },
    // 0 启用状态
    // 1 禁用状态
    state: {
        type: Number,
        default: 0,
        trim: true
    }
});

// 创建集合
const User = mongoose.model('User', userSchema);

// 创建管理员用户实例
async function createUser() {
    // 生成随机字符串
    // genSalt方法接受一个数值作为参数
    // 数值越大 生成的随机字符串复杂度越高 
    // 数值越小 生成的随机字符串复杂度越低
    // 默认值是10  
    // 返回生成的随机字符串
    const salt = await bcrypt.genSalt(10);
    // 对密码进行加密
    // 1.要进行加密的明文
    // 2.随机字符串
    // 返回值是加密后的密码
    const pass = await bcrypt.hash('123456', salt);
    const user = await User.create({
        username: 'luoxu',
        email: '1565066165@qq.com',
        password: pass,
        role: 'admin',
        state: 0
    });
};
// createUser();
const validateUser = user => {
    //  定义对象验证规则
    const schema = {
        username: Joi.string().min(2).max(20).required().error(new Error('用户名格式不符合规则')),
        email: Joi.string().email().required().error(new Error('邮箱格式不符合规则')),
        password: Joi.string().regex(/^[a-zA-Z0-9]{6,30}$/).required().error(new Error('密码格式不符合规则')),
        role: Joi.string().valid(['normal', 'admin']).required().error(new Error('角色值非法')),
        state: Joi.number().valid([0, 1]).required().error(new Error('状态值非法'))
    }
    return Joi.validate(user, schema);
}



// 将用户集合作为模块成员进行导出
module.exports = {
    User,
    validateUser
};
