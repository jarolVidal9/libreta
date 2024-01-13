const {Sequelize, DataTypes, Model, UUIDV4} = require('sequelize')

const sequelize = new Sequelize('agenda','root','',{
    host:'localhost',
    dialect: 'mysql',
    //port:3006
});

class User extends Model{}

User.init({
    user_id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    email:{
        type: DataTypes.STRING,
        allowNul: false,
        unique:true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    gender:{
        type: DataTypes.STRING,
        allowNull: false
    },
    date_of_birth:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    image:{
        type: DataTypes.JSON,
        allowNull:true
    }

},{
    sequelize,
    modelName: 'User'
});


module.exports = User;
