// 引入joi模块
const Joi = require('joi');
// 定义对象验证规则
const schema = {
    username: Joi.string().min(2).max(20).required().error(new Error('username验证规则没有通过')),
    birth: Joi.number().min(1900).max(2020).error(new Error('birth验证规则没有通过'))
}
async function run() {
    try {
        // 实施验证
        await Joi.validate({ username: 'abc', birth: 1990 }, schema);
    } catch (error) {
        console.log(error.message);
        return;
    }
    console.log('验证通过');
};
run();
