const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const app = express();
const database = 'Estoque'
const port = 4000;

const user = 'root';//alterar para sua senha e usuário 
const psw = 'Db_12345678';


// Configuração do CORS
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados
const db = mysql.createConnection({
  host: 'localhost',
  user: user,
  password: psw,
  database: database
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados.');
});

// Rotas pars buscar informações

app.get('/search/:type/:term', (req, res) => {
  const type = req.params.type
  const term = req.params.term

  const sql = `SELECT * FROM ProdutosDetalhados WHERE ${type} = ?`;
  db.query(sql, [term], (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao pesquisar item dados.');
    }
    res.send(results);
  });
});
app.get('/get/columns/:table', (req, res) => {
  const table = req.params.table
  const sql = `SHOW COLUMNS FROM ${table}`;
  db.query(sql, [table], (err, results) => {
    if (err) {
      console.error(err)
      return res.status(500).send('Erro ao pesquisar item dados.');
    }
    const columnsName = results.map(column => column.Field);
    console.debug(columnsName)
    res.json(columnsName);
  });
});

//Rotas para inserir dados
app.post('/insert/:type', (req, res) => {
const type = req.params.type
const dados = req.body
console.debug(dados)
sql = ""
if(type === "Produtos"){
  sql = `INSERT INTO ${type} (Nome, Preco, Quantidade, CategoriaID, FornecedorID) VALUES (?, ?, ?, ?, ?)`;
  params = [dados.Nome, dados.Preco, dados.Quantidade, dados.CategoriaID, dados.FornecedorID];
} else if (type === "Categorias"){
  sql = `INSERT INTO ${type} (Nome) VALUES (?)`;
  params = [dados.Nome];
} else {
  sql = `INSERT INTO ${type} (Nome, Contato) VALUES (?, ?)`;
  params = [dados.Nome, dados.Contato];
}
db.query(sql, params,(err, result) => {
  if (err) {
    console.debug(err)
    return res.status(500).send('Erro ao inserir dados.', err);
  }
    res.status(201).send('Item inserido com sucesso.');
  });

});

//Rotas para deletar
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id
  const sql = 'DELETE FROM Produtos WHERE ProdutoID = ?'
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.debug(err)
      return res.status(500).send('Erro ao deletar dados.', err);
    }
      res.status(201).send('Item deletado com sucesso.');
      console.debug(sql, id)
  });
});

//Rota para editar 
app.put('/update/product/:productID', (req, res) => {
  const product_id = req.params.productID
  console.debug(product_id)
  const {  ProdutoNome, Preco, Quantidade, CategoriaID, FornecedorID } = req.body;
  const sql = 'UPDATE Produtos SET Nome = ?, Preco = ?, Quantidade = ?, CategoriaID = ?, FornecedorID = ? WHERE ProdutoID = ?';

  db.query(sql, [ProdutoNome, Preco, Quantidade, CategoriaID, FornecedorID, product_id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar o produto');
    }
    res.send('Produto atualizado com sucesso');
  });
});


// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
