const express = require('express')
const app = express()
const port = 3000
const { sequelize } = require('./connectDB/db')
const route = require('./routes')
const dotenv = require('dotenv').config({});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))


app.use(route)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Example app listening on http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})