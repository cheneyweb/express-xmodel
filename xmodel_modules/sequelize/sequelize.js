var Sequelize = require('sequelize');
var config = require('config');
var dbConfig = config.get('db');
/**
 * [sequelize 数据库连接]
 * export NODE_ENV=production
 * @type {Sequelize}
 */
var sequelize = new Sequelize(dbConfig.dbname, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

module.exports = sequelize;
