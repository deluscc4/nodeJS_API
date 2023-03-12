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
    // trim remove os espaços vazios no ínicio e no final do valor, se ao remover sobrar o total de 0 caracteres, faça:
    if (!req.body.nome || req.body.nome.trim() == 0)
        return res.send("O campo nome não pode ficar vazio.")
    else if (!req.body.preco || req.body.preco.trim() == 0)
        return res.send("O campo preço não pode ficar vazio.")
    else {
        // push é um método para add itens em um array
        lista.push({
            // length retorna o tamanho de um array
            id: lista.length,
            // req.body retorna todos os itens que tem no body da requisição
            item: req.body.nome,
            preco: req.body.preco
        })
    }

    res.send('Sucesso.')
})

app.put('/atualizar/:id', function(req, res) {
    const id = req.params.id

    const index = lista.findIndex(function(item) {
        return item.id == id
    })

    if (!req.body.nome || req.body.nome.trim() == 0)
        return res.send("O campo nome não pode ficar vazio.")
    else if (!req.body.preco || req.body.preco.trim() == 0) 
        return res.send("O campo preço não pode ficar vazio.")
    else {
        lista[index].item = req.body.nome
        lista[index].preco = req.body.preco
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

app.post('/desconto', function(req, res) {
    novaLista = lista.map((item) => {
    // aplica 10% de desconto ao preço do item
        item.preco = item.preco * 0.9
        return item
    })
  
    res.send('Desconto de 10% aplicado com sucesso.')
})

// Desafio:
// Adicionar preço nos itens
// Quando atualizar tem que receber o preço
// Criar uma rota do tipo POST que aplica 10% de desconto em todos os itens
