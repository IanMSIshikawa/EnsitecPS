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

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
