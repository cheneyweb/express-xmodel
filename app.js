// 系统配置
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
const modelDir = __dirname + config.get('server').modelDir
// 应用服务
const express = require('express')
const bodyParser = require('body-parser')
const router = require(__dirname + '/xmodel_modules/router/router.js')
// 认证相关
const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require(__dirname + '/xmodel_modules/auth/passport_config.js')
// 持久化相关
const fs = require('fs')
const log = require('tracer').colorConsole({ level: require('config').get('log').level })
const sequelize = require(__dirname + '/xmodel_modules/sequelize/sequelize.js')

// 初始化应用服务器
const app = express()
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}));
// 初始化调用 passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
// 使用路由统一控制(目前支持以下5种RESTful请求)
/**
 * [POST]http://host:port/xmodel/MODEL/create
 * [POST]http://host:port/xmodel/MODEL/update
 * [POST]http://host:port/xmodel/MODEL/query
 * [GET]http://host:port/xmodel/MODEL/get/:id
 * [GET]http://host:port/xmodel/MODEL/destroy/:id
 */
app.use(controllerRoot, router)

// 首先同步所有实体和数据库
fs.readdirSync(modelDir).forEach(function(filename) {
    require(modelDir + filename)
})
sequelize.sync().then(function() {
    log.info('XModel所有实体已同步数据库')
})
// 开始服务监听
app.listen(port, function() {
    log.info(`XModel服务已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/create`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/update`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/query`)
    log.info(`[GET]http://host:${port}/xmodel/MODEL/get/:id`)
    log.info(`[GET]http://host:${port}/xmodel/MODEL/destroy/:id`)
})
