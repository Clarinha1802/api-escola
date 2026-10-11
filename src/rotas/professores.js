const express = require('express')
const router = express.Router() //cria roteador que agrupa as rotas dos cursos

const Professor = require('../modelo/Professor')

/*
async: indica que uma função pode trabalhar com operações assíncronas usando await
await: faz a execução daquela função esperar uma operação assíncrona terminar antes de continuar
*/

router.get('/', async (req, res) => {
    try {
        const professores = await Professor.findAll()

        res.json(professores)

    } catch(erro) {
        res.status(500).json({
            erro: 'Erro ao listar professores'
        })
    }
})

router.post('/', async (req, res) => {
    try{
        const professor = await Professor.create({
            nome: req.body.nome,
            cursoId: req.body.cursoId
        })

        res.status(201).json(professor)

    } catch(erro){
        res.status(500).json({erro: 'Erro ao criar professor'})
    }
})

router.patch('/:id', async (req, res) => {
    try {
        const professor = await Professor.findByPk(req.params.id)

        if(!professor) {
            return res.status(404).json({erro: 'Professor não encontrado'})
        }

        if(req.body.nome !== undefined){
            professor.nome = req.body.nome
        }

        if(req.body.cursoId !== undefined){
            professor.cursoId = req.body.cursoId
        }
        

        await professor.save()

        res.json(professor)

    }catch(erro){

        console.log(erro)
        res.status(500).json({erro: 'Erro ao atualizar professor'})
    }
})

router.delete('/:id', async (req,res) => {
    try {
        const professor = await Professor.findByPk(req.params.id)

        if(!professor){
            return res.status(404).json({erro: 'Professor não encontrado'})
        }

        await professor.destroy()

        res.json({mensagem: 'Professor apagado com sucesso'})

    }catch(erro){
        res.json({json: 'Erro ao apagar professor'})
    }
})


module.exports = router