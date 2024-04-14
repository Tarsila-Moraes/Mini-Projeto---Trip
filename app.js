const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3300;

app.use(bodyParser.json());

function logRequest(req, res, next) {
    console.log('Nova requisição:');
    console.log('Método:', req.method);
    console.log('URL:', req.orinalUrl);
    console.log('Corpo:', req.body);
    console.log('Hora:', new Date().toLocaleString());
    console.log('-------------------');

    next();
}

app.use(logRequest);

let produtos = [];

app.post('/produto', (req, res) => {
    const novoProduto = req.body;

    if (!novoProduto.nome || !novoProduto.preco || !novoProduto.descricao) {
        return res.status(400).json({mensagem: 'Todos os campos dos produtos são obrigatórios'});
    }

produtos.push(novoProduto);

return res.status(201).json({mensagem:'Produto adicionado com sucesso'});

});

app.put('/produto/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);
    console.log('ID do produto:', produtoId);
    const dadosAtualizados = req.body;
    console.log('Dados atualizados', dadosAtualizados);
    console.log(produtos);

    const index = produtos.findIndex(produto => produto.id === produtoId);

    console.log('Índice encontrado:', index);

    if (index === -1) {
        return res.status(404).send('Produto não encontrado');
    }

    produtos[index] = {...produtos[index], ...dadosAtualizados};

    console.log('Lista de produtos após a atualização:', produtos);

    return res.status(200).json({mensagem: 'Produto atualizado com sucesso'});
});

app.delete('/produto/:id', (req, res) => {
    const produtoId = parseInt(req.params.id);

    const index = produtos.findIndex(produto => produto.id === produtoId);
    if (index === -1) {
        return res.status(404).json({mensagem: 'Produto não encontrado'});
    }

    produtos.splice(index, 1);
    return res.status(200).json({mensagem: 'Produto excluído com sucesso'});
});


app.get('/produtos', (req,res) => {
    return res.status(200).json(produtos);
});


app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});


