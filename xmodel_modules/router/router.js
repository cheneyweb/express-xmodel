// 路由相关
const express = require('express')
const router = express.Router()
// 认证与日志
const passport = require(__dirname + '/../auth/passport_config.js')
const log = require('tracer').colorConsole({ level: require('config').get('log').level })
// 路径信息
const CONTROLLER_PATH = __dirname + '/../controller/ModelController.js'
const MODEL_SUFFIX = '.js'

// 配置路由与Controller方法的绑定
// 创建实体对象
router.post('/*/create', function(req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.path.split('/')[1])) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    require(CONTROLLER_PATH).create(req, res)
})
// 更新实体对象
router.post('/*/update', function(req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.path.split('/')[1])) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    require(CONTROLLER_PATH).update(req, res)
})
// 复杂查询实体对象
router.post('/*/query', function(req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.path.split('/')[1])) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    require(CONTROLLER_PATH).query(req, res)
})
// 销毁实体对象(删除时需要登录认证权限)
router.get('/*/destroy/:id', function(req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.path.split('/')[1])) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    require(CONTROLLER_PATH).destroy(req, res)
})
// 获取实体对象
router.get('/*/get/:id', function(req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.path.split('/')[1])) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    require(CONTROLLER_PATH).get(req, res)
})

// 登录认证
router.post('/user/login', passport.authenticate('local', { failureFlash: true }), function(req, res) {
    // log.info(req.user);
    res.send("success")
})

// 认证测试
router.get('/user/testauth', passport.authenticateMiddleware(), function(req, res) {
    res.send('允许访问')
})

function ucfirst(str) {
    str = str.toLowerCase()
    str = str.replace(/\b\w+\b/g, function(word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    return str
}

function transJavaStyle(str) {
    let re = /_(\w)/g
    return str.replace(re, function($0, $1) {
        return $1.toUpperCase()
    })
}

module.exports = router
