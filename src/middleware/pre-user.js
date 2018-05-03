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
    let inparam = req.body
    if (inparam.username.length > 10) {
        res.send({ err: true, res: '用户名太长' })
    } else {
        inparam.username = 'cheneyxu'
        return next()
    }
})

module.exports = router