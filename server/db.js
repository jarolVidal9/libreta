const {Sequelize} = require('sequelize')

const sequelize = new Sequelize('agenda','root','',{
    host:'localhost',
    dialect: 'mysql',
    //port:3006
});


module.exports = sequelize