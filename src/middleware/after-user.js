// 系统配置参数
const config = require('config')
// 路由相关
const express = require('express')
const router = express.Router()
// 日志相关
const log = require('tracer').colorConsole({ level: config.log.level })

/**
 * 业务认证中间件例子，进行参数校验等处理
 */
router.post('/UserModel/create', async function (req, res, next) {
    log.info('后置路由处理')
    res.send(res.result)
})

module.exports = router