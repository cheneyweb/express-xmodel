const log = require('tracer').colorConsole()
/**
 * [ModelController 实体控制器，接收路由入参，对实体进行数据库操作]
 * 默认MODEL文件夹路径位于{PROJECT}/src/model/
 * @type {Object}
 */
const ModelController = {
    /**
     * [create 直接插入JSON对象]
     * @param  {[type]} req [description]
     * @return {[type]}     [description]
     */
    create: function (req) {
        // 从请求路径中获取Controller名称
        const Model = req.Model
        const model = req.body
        return new Promise((resolve, reject) =>
            Model.create(model).then(function (result) {
                model.id = result.id
                resolve(model)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [update 通过ID更新JSON对象]
     * @param  {[type]} req [description]
     * @return {[type]}     [description]
     */
    update: function (req, res) {
        const Model = req.Model
        const model = req.body
        const where = { where: { id: model.id } }
        return new Promise((resolve, reject) =>
            Model.update(model, where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [query 通过JSON对象作为条件查询]
     * @param  {[type]} req [description]
     * @return {[type]}     [description]
     */
    query: function (req, res) {
        const Model = req.Model
        const where = { where: req.body }
        return new Promise((resolve, reject) =>
            Model.findAll(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [get 通过ID作为条件查询]
     * @param  {[type]} req [description]
     * @return {[type]}     [description]
     */
    get: function (req, res) {
        const Model = req.Model
        const where = { where: { id: req.params.id } }
        return new Promise((resolve, reject) =>
            Model.findOne(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    },
    /**
     * [destroy 通过ID作为条件删除]
     * @param  {[type]} req [description]
     * @return {[type]}     [description]
     */
    destroy: function (req, res) {
        const Model = req.Model
        const where = { where: { id: req.params.id } }
        return new Promise((resolve, reject) =>
            Model.destroy(where).then(function (result) {
                resolve(result)
            }).catch(function (err) {
                log.error(err.message)
                reject(err.message)
            })
        )
    }
}

module.exports = ModelController
