const {DataTypes} = require('sequelize')
const sequelize = require('../config/banco')

const Professor = sequelize.define('Professor', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cursoId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports= Professor