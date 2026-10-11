const express = require('express')// importando o express
const sequelize = require('./config/banco')

//importando os modelos
const Aluno = require('./modelo/Aluno')
const Professor = require('./modelo/Professor')
const Curso = require('./modelo/Curso')


//importando rotas
const cursosRoutes = require('./rotas/cursos')
const alunosRoutes = require('./rotas/alunos')
const professoresRoutes = require('./rotas/professores')


const app = express() //cria a aplicação do servidor

app.use(express.json())

//organizando as relações entre as tabelas e estamos fazendo desse modo para que o sequelize crie outro campo
Curso.hasMany(Aluno, {
    foreignKey: 'cursoId'
})

Aluno.belongsTo(Curso, {
    foreignKey: 'cursoId'
})

Curso.hasMany(Professor, {
    foreignKey: 'cursoId'
})

Professor.belongsTo(Curso, {
    foreignKey: 'cursoId'
})

//registrando as rotas

app.use('/cursos', cursosRoutes)
app.use('/alunos', alunosRoutes)
app.use('/professores', professoresRoutes)


sequelize.sync()// sincroniza os modelos com as tabelas no banco
    .then(() => { //executa quando a sincronização termina
        console.log('Banco de dados sincronizado')

        app.listen(3000, () => {
            console.log('Servidor rodando na porta 3000')
        })
    })
    .catch((erro) => {
        console.log('Erro ao sincronizar o banco', erro)
    })
