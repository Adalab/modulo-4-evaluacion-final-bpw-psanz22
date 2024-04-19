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

server.put('/works/:id_work', async (req, res) => {
  const idWork = req.params.id;

  const newData = req.body;
  const { title, year, image } = newData;

  const connection = await getDBConnection();
  const updateQuery = `UPDATE work SET title= ?, year = ?, image= ? WHERE id_work = ?`;
  const [result] = await connection.query(updateQuery, [
    title,
    year,
    image,
    idWork,
  ]);
  res.status(200).json({
    success: true,
  });
});
server.put('/artists/:id', async (req, res) => {
  const idArtist = req.params.id;

  const newData = req.body;
  const { name, lastname, movement, picture } = newData;

  const connection = await getDBConnection();
  const updateQuery = `UPDATE artists SET name= ?, lastname = ?, movement= ?, picture= ? WHERE id= ?`;
  const [result] = await connection.query(updateQuery, [
    name,
    lastname,
    movement,
    picture,
    idArtist,
  ]);
  res.status(200).json({
    success: true,
  });
});

server.delete('/works/:id_work', async (req, res) => {
  const idWork = req.params.id_work;

  const connection = await getDBConnection();

  const deleteQuery = `DELETE FROM work WHERE id_work = ?`;
  const [result] = await connection.query(deleteQuery, [idWork]);
  if (result.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: 'Elemento eliminado',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'No se ha eliminado el elemento',
    });
  }
});
server.delete('/artists/:id', async (req, res) => {
  const idArtist = req.params.id;

  const connection = await getDBConnection();

  const deleteQuery = `DELETE FROM artists WHERE id = ?`;
  const [result] = await connection.query(deleteQuery, [idArtist]);
  if (result.affectedRows > 0) {
    res.status(200).json({
      success: true,
      message: 'Elemento eliminado',
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'No se ha eliminado el elemento',
    });
  }
});
