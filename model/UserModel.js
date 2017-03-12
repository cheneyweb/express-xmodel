var Sequelize = require('sequelize');
var sequelize = require('../sequelize/sequelize.js');

var UserModel = sequelize.define('test_user_model', {
    username: Sequelize.STRING,
    password: Sequelize.STRING
});

module.exports = UserModel;