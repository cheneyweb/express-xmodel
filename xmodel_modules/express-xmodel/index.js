// 路由相关
const express = require('express')
const router = express.Router()
// 控制器加载
const CONTROLLER_PATH = __dirname + '/controller/ModelController.js'
const MODEL_SUFFIX = '.js'
const fs = require('fs')
const log = require('tracer').colorConsole()

// 初始化数据库连接
router.initConnect = function (modelDir, sequelize) {
    router.modelDir = modelDir
    // 首先同步所有实体和数据库
    fs.readdirSync(modelDir).forEach(function (filename) {
        require(modelDir + filename)
    })
    sequelize.sync().then(function () {
        log.info('xmodel所有实体已同步数据库')
    })
}
// 配置路由与Controller方法的绑定
// 创建实体对象
router.post('/:model_name/create', function (req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    model.create(req, res)
})
// 更新实体对象
router.post('/:model_name/update', function (req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    model.update(req, res)
})
// 复杂查询实体对象
router.post('/:model_name/query', function (req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    model.query(req, res)
})
// 销毁实体对象(删除时需要登录认证权限)
router.get('/:model_name/destroy/:id', function (req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    model.destroy(req, res)
})
// 获取实体对象
router.get('/:model_name/get/:id', function (req, res) {
    // 从请求路径中获取Controller名称
    req.modelName = transJavaStyle(ucfirst(req.params.model_name)) + MODEL_SUFFIX
    // 动态加载对应名称的方法
    let model = require(CONTROLLER_PATH)
    if (router.modelDir) {
        model.modelDir = router.modelDir
    }
    model.get(req, res)
})

function ucfirst(str) {
    str = str.toLowerCase()
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1)
    })
    return str
}

function transJavaStyle(str) {
    let re = /_(\w)/g
    return str.replace(re, function ($0, $1) {
        return $1.toUpperCase()
    })
}

module.exports = router
