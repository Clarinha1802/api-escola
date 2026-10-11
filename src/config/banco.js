const {Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite', 
    storage: './banco/banco.sqlite', 
    logging: false//
})

module.exports = sequelize;


/*
importei o sequelize
foi criado uma conexão
dialect: qual tipo de banco
storage: onde está o arquivo do banco
logging: se mostra ou não os comandos no terminal


*/