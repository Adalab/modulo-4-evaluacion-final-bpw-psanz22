const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const server = express();

server.use(cors());
server.use(express.json());

async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'museum',
  });
  return connection;
}

const port = process.env.PORT || 5002;
server.listen(port, () => {
  console.log(`Server is listening in port: ${port}`);
});

server.get('/works', async (req, res) => {
  const connection = await getDBConnection();

  const querySQL = 'SELECT * FROM work';
  const [result] = await connection.query(querySQL);
  console.log(result);
  connection.end();

  res.json({
    info: { count: result.length },
    result: result,
  });
});

server.post('/newwork', async (req, res) => {
  const connection = await getDBConnection();

  const artistQuerySQL = `INSERT INTO artists (name, lastname, movement, picture) VALUES(?,?,?,?)`;

  const [artistResult] = await connection.query(artistQuerySQL, [
    req.body.name,
    req.body.lastname,
    req.body.movement,
    req.body.picture,
  ]);
  const workQuerySQL = `INSERT INTO work (title, year, image, fk_artists_id) VALUES (?,?,?,?)`;

  const [workResult] = await connection.query(workQuerySQL, [
    req.body.title,
    req.body.year,
    req.body.image,
    artistResult.insertId,
  ]);
  res.status(201).json({
    success: true,
    id: workResult.insertId,
    message: 'Todo correcto',
  });
});
