// 连接数据库
// 引入mongoose模块
const mongoose = require('mongoose');
// 引入config模块
const config = require('config');
mongoose.connect(`mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => { console.log('数据库连接成功') })
    .catch(err => { console.log(err, '数据库连接失败') });