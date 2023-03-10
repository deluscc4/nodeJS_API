// importar as dependencias
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// criar nosso servidor express
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.listen(9000, () => console.log("A aplicação está rodando na porta 9000."))

// rotas
let lista = []

app.get('/', function(req, res) {
    return res.json(lista)
})

app.post('/adicionar', function(req, res) {
    // trim remove os espaços vazios no ínicio e no final do input, se ao remover sobrar o total de 0 caracteres, faça:
    if(!req.body.nome || req.body.nome.trim() == 0)
        return res.send("Preencha o nome.")
    else {
        // push é um método para add itens em um array
        lista.push({
            // length retorna o tamanho de um array
            id: lista.length,
            // req.body retorna todos os itens que tem no body da requisição
            item: req.body.nome
        })
    }

    res.send('Sucesso.')
})

app.put('/atualizar/:id', function(req, res) {
    const id = req.params.id

    const index = lista.findIndex(function(item) {
        return item.id == id
    })

    if(!req.body.nome) {
        return res.send("Erro.")
    } else {
        lista[index].item = req.body.nome;
        return res.send("Sucesso.")
    }
})

app.delete('/remover/:id', function(req, res) {
    const id = req.params.id

    const novaLista = lista.filter(function(item) {
        return item.id != id
    })

    lista = novaLista

    res.send("Sucesso.")
})

// Desafio:
// Adicionar preço nos itens
// Quando atualizar tem que receber o preço
// Criar uma rota do tipo POST que aplica 10% de desconto em todos os itens