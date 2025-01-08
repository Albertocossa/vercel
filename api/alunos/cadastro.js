import mysql from 'mysql2';

const db = mysql.createPool({
    host: 'mysql-xitique.alwaysdata.net',
    user: 'xitique',
    password: 'Acossa@824018...84',
    database: 'xitique_cash',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { nome, turma } = req.body;

        console.log("Dados recebidos:", { nome, turma });

        const query = 'INSERT INTO alunos (nome, turma) VALUES (?, ?)';

        db.execute(query, [nome, turma], (err, results) => {
            if (err) {
                console.error('Erro na execução da consulta:', err);
                return res.status(500).json({ error: 'Erro ao cadastrar aluno' });
            }

            console.log('Aluno cadastrado:', results);
            res.status(200).json({ message: 'Aluno cadastrado com sucesso' });
        });
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
}
