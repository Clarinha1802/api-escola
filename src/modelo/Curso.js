const {DataTypes} = require('sequelize')

const sequelize = require('../config/banco')

const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Curso

/*
importando os tipos de dados
importa a conexão
sequelize.define: define um modelo do Sequelize


*/