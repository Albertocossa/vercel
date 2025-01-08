const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Conexão com o banco de dados MySQL
const db = mysql.createConnection({
  host: 'mysql-xitique.alwaysdata.net',
  user: 'xitique',
  password: 'Acossa@824018...84',
  database: 'xitique_cash',
  //port: 3306,
});

db.connect((err) => {
    if (err) {
        console.error('Erro de conexão com o banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados');
});

// Endpoint para cadastro de alunos
app.post('/cadastrar', (req, res) => {
    const { nome, turma } = req.body;
    
    // Insere os dados do aluno no banco
    const query = 'INSERT INTO alunos (nome,turma) VALUES (?, ?)';
    db.execute(query, [nome, turma], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
        }
        res.status(200).json({ message: 'Aluno cadastrado com sucesso' });
    });
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});



