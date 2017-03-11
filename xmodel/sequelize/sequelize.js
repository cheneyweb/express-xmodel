var Sequelize = require('sequelize');
/**
 * [sequelize 数据库连接]
 * @type {Sequelize}
 */
var sequelize = new Sequelize('alpha', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;