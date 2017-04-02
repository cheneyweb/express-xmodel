// 系统配置
const config = require('config')
const port = config.get('server').port
const controllerRoot = config.get('server').controllerRoot
// 应用服务
const express = require('express')
const bodyParser = require('body-parser')
const xmodel = require(__dirname + '/xmodel_modules/x-model/index.js')
// 认证相关
const expressSession = require('express-session')
const flash = require('connect-flash')
const passport = require(__dirname + '/src/auth/passport_config.js')
// 持久层相关
const fs = require('fs')
const sequelize = require(__dirname + '/src/sequelize/sequelize.js')
let modelDir = __dirname + config.get('server').modelDir

// 日志相关
const log = require('tracer').colorConsole({ level: config.get('log').level })

// 初始化应用服务器
const app = express()
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'cheneyxu',
    resave: false,
    saveUninitialized: false
}))
// 初始化调用 passport
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use('/',function(req,res,next){
	log.info('统一权限控制')
	if(true){
		next()
	}else{
		res.send('权限校验失败')
	}
})
// 使用路由统一控制(目前支持以下5种RESTful请求)
/**
 * [POST]http://host:port/xmodel/MODEL/create
 * [POST]http://host:port/xmodel/MODEL/update
 * [POST]http://host:port/xmodel/MODEL/query
 * [GET]http://host:port/xmodel/MODEL/get/:id
 * [GET]http://host:port/xmodel/MODEL/destroy/:id
 */

// 首先同步所有实体和数据库
fs.readdirSync(modelDir).forEach(function(filename) {
    require(modelDir + filename)
})
sequelize.sync().then(function() {
    log.info('xmodel所有实体已同步数据库')
})
xmodel.modelDir = modelDir
app.use(controllerRoot, xmodel)

// 开始服务监听
app.listen(port, function() {
    log.info(`XModel服务已启动,执行环境:${process.env.NODE_ENV},端口:${port}...`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/create`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/update`)
    log.info(`[POST]http://host:${port}/xmodel/MODEL/query`)
    log.info(`[GET]http://host:${port}/xmodel/MODEL/get/:id`)
    log.info(`[GET]http://host:${port}/xmodel/MODEL/destroy/:id`)
})
