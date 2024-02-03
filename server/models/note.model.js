const {DataTypes, Model, UUIDV4} = require('sequelize')
const sequelize = require('../db')

class Note extends Model{}

Note.init({
    note_id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
    },
    title:{
        type: DataTypes.STRING,
    },
    text:{
        type:DataTypes.TEXT
    },
    images:{
        type: DataTypes.STRING
    },
    color:{
        type: DataTypes.STRING
    }
},{
    sequelize,
    modelName: 'Note'
})

module.exports = Note;