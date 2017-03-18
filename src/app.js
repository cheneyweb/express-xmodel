// 应用服务
var express = require('express');
var bodyParser = require('body-parser');
var router = require(__dirname + '/../xmodel_modules/router/router.js');
// 认证相关
var expressSession = require('express-session');
var passport = require(__dirname + '/../xmodel_modules/auth/passport_config.js');
var flash = require('connect-flash');
// 持久化相关
var sequelize = require(__dirname + '/../xmodel_modules/sequelize/sequelize.js');
var fs = require('fs');
var log = require('tracer').colorConsole({ level: require('config').get('log').level });

// 初始化应用服务器
var app = express();
app.use(bodyParser.json());
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}));
// 初始化调用 passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// 使用路由统一控制(目前支持以下5种RESTful请求)
/**
 * [POST]http://host:port/model/create
 * [POST]http://host:port/model/update
 * [POST]http://host:port/model/query
 * [GET]http://host:port/model/get/:id
 * [GET]http://host:port/model/destroy/:id
 */
app.use('/', router);

// 首先同步所有实体和数据库
fs.readdirSync(__dirname + '/model/').forEach(function(filename) {
    require(__dirname + '/model/' + filename);
});
sequelize.sync().then(function() {
    log.info('##### 所有实体已同步数据库');
});

// 开始服务监听
var port = require('config').get('server').port;
var server = app.listen(port, function() {
    var port = server.address().port;
    log.info('##### XModel 服务正在监听端口:', port);
});
