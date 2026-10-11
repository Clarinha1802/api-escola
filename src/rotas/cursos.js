const express = require('express')
const router = express.Router() //cria roteador que agrupa as rotas dos cursos

const Curso = require('../modelo/Curso')
const Aluno = require('../modelo/Aluno')
/*
async: indica que uma função pode trabalhar com operações assíncronas usando await
await: faz a execução daquela função esperar uma operação assíncrona terminar antes de continuar
*/

router.get('/', async (req, res) => {
    try {
        const cursos = await Curso.findAll()

        res.json(cursos)

    } catch(erro) {
        res.status(500).json({
            erro: 'Erro ao listar cursos'
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const curso = await Curso.create({
            nome: req.body.nome
        })

        res.status(201).json(curso)

    } catch(erro){
        res.status(500).json({erro: 'Erro ao criar curso'})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const curso = await Curso.findByPk(req.params.id)

        if(!curso) {
            return res.status(404).json({erro: 'Curso não encontrado'})
        }

        if(req.body.nome !== undefined){
            curso.nome = req.body.nome
        }

        

        await curso.save()

        res.json(curso)

    }catch(erro){
        res.status(500).json({erro: 'Erro ao atualizar'})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const curso = await Curso.findByPk(req.params.id)

        if(!curso){
            return res.status(404).json({erro: 'Curso não encontrado'})
        }

        await curso.destroy()

        res.json({mensagem: 'Curso apagado com sucesso'})

    }catch(erro){
        res.json({json: 'Erro ao apagar curso'})
    }
})


module.exports = router