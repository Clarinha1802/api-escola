const express = require('express')
const router = express.Router() //cria roteador que agrupa as rotas dos cursos

const Aluno = require('../modelo/Aluno')


/*
async: indica que uma função pode trabalhar com operações assíncronas usando await
await: faz a execução daquela função esperar uma operação assíncrona terminar antes de continuar
*/

router.get('/', async (req, res) => {
    try {
        const alunos = await Aluno.findAll()

        res.json(alunos)

    } catch(erro) {
        res.status(500).json({
            erro: 'Erro ao listar alunos'
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const alunos = await Aluno.create({
            nome: req.body.nome,
            cursoId: req.body.cursoId
        })

        res.status(201).json(alunos)

    } catch(erro){
        res.status(500).json({erro: 'Erro ao criar aluno'})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id)

        if(!aluno) {
            return res.status(404).json({erro: 'Aluno não encontrado'})
        }

        if(req.body.nome !== undefined){
            aluno.nome = req.body.nome
        }

        if(req.body.cursoId !== undefined){
            aluno.cursoId = req.body.cursoId
        }
        

        await aluno.save()

        res.json(aluno)

    }catch(erro){
        res.status(500).json({erro: 'Erro ao atualizar aluno'})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const aluno = await Aluno.findByPk(req.params.id)

        if(!aluno){
            return res.status(404).json({erro: 'Aluno não encontrado'})
        }

        await aluno.destroy()

        res.json({mensagem: 'Curso apagado com sucesso'})

    }catch(erro){
        res.json({json: 'Erro ao apagar aluno'})
    }
})


module.exports = router