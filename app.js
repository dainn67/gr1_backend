const express = require('express');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

const config = {
  user: 'dainn',
  password: 'Spyderpyg59@',
  server: 'gr1-server.database.windows.net',
  port: 1433,
  database: 'Gr1_Backend',
  options: {
    encrypt: true,
  },
};

app.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`Select * from SalesLT.Address`;
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
