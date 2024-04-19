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
