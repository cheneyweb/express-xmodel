var log = require('tracer').colorConsole({ level: require('config').get('log').level });

const MODEL_PATH = '../model/';

/**
 * [ModelController 实体控制器，接收路由入参，对实体进行数据库操作]
 * @type {Object}
 */
var ModelController = {
    /**
     * [create 直接插入JSON对象]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    create: function(req, res) {
        // 从请求路径中获取Controller名称
        var Model = require(MODEL_PATH + req.modelName);
        var model = req.body;
        Model.create(model).then(function(result) {
            model.id = result.id;
            res.send(model);
        }).catch(function(err) {
            log.error(err.message);
        });
    },
    /**
     * [update 通过ID更新JSON对象]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    update: function(req, res) {
        var Model = require(MODEL_PATH + req.modelName);
        var model = req.body;
        var where = { where: { id: model.id } };
        Model.update(model, where).then(function(result) {
            res.send('success');
        }).catch(function(err) {
            log.error(err.message);
        });
    },
    /**
     * [query 通过JSON对象作为条件查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    query: function(req, res) {
        var Model = require(MODEL_PATH + req.modelName);
        var where = { where: req.body };
        Model.findAll(where).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            log.error(err.message);
        });
    },
    /**
     * [get 通过ID作为条件查询]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    get: function(req, res) {
        var Model = require(MODEL_PATH + req.modelName);
        var where = { where: { id: req.params.id } };
        Model.findOne(where).then(function(result) {
            res.send(result);
        }).catch(function(err) {
            log.error(err.message);
        });
    },
    /**
     * [destroy 通过ID作为条件删除]
     * @param  {[type]} req [description]
     * @param  {[type]} res [description]
     * @return {[type]}     [description]
     */
    destroy: function(req, res) {
        var Model = require(MODEL_PATH + req.modelName);
        var where = { where: { id: req.params.id } };
        Model.destroy(where).then(function(result) {
            res.send('success');
        }).catch(function(err) {
            log.error(err.message);
        });
    }
};

module.exports = ModelController;
