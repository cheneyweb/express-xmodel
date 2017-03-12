var Sequelize = require('sequelize');
var sequelize = require('../sequelize/sequelize.js');

var UserModel = sequelize.define('test_user_model', {
    name: Sequelize.STRING,
    code: Sequelize.STRING
});

module.exports = UserModel;