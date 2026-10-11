const {DataTypes} = require('sequelize')
const sequelize = require('../config/banco')

const Aluno = sequelize.define('Aluno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cursoId: {
        type:DataTypes.INTEGER,
        allowNull: false

    }
})

module.exports = Aluno