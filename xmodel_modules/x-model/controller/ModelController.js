const log = require('tracer').colorConsole()
/**
 * [ModelController 实体控制器，接收路由入参，对实体进行数据库操作]
 * 默认MODEL文件夹路径位于{PROJECT}/src/model/
 * @type {Object}
 */
let ModelController = {
    modelDir:__dirname + '/../../../src/model/',
    /**
     * [create 直接插入JSON对象]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    create: function(req, res) {
        // 从请求路径中获取Controller名称
        let Model = require(this.modelDir + req.modelName)
        let model = req.body
        Model.create(model).then(function(result) {
            model.id = result.id
            res.send(model)
        }).catch(function(err) {
            log.error(err.message)
        })
    },
    /**
     * [update 通过ID更新JSON对象]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    update: function(req, res) {
        let Model = require(this.modelDir + req.modelName)
        let model = req.body
        let where = { where: { id: model.id } }
        Model.update(model, where).then(function(result) {
            res.send('success')
        }).catch(function(err) {
            log.error(err.message)
        })
    },
    /**
     * [query 通过JSON对象作为条件查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    query: function(req, res) {
        let Model = require(this.modelDir + req.modelName)
        let where = { where: req.body }
        Model.findAll(where).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            log.error(err.message)
        })
    },
    /**
     * [get 通过ID作为条件查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    get: function(req, res) {
        let Model = require(this.modelDir + req.modelName)
        let where = { where: { id: req.params.id } }
        Model.findOne(where).then(function(result) {
            res.send(result)
        }).catch(function(err) {
            log.error(err.message)
        })
    },
    /**
     * [destroy 通过ID作为条件删除]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    destroy: function(req, res) {
        let Model = require(this.modelDir + req.modelName)
        let where = { where: { id: req.params.id } }
        Model.destroy(where).then(function(result) {
            res.send('success')
        }).catch(function(err) {
            log.error(err.message)
        })
    }
}

module.exports = ModelController
