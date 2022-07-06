const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const { sequelize } = require('./connectDB/db')
const route = require('./routes')
const dotenv = require('dotenv').config({});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(route)



app.listen(port, async () => {
  console.log(`Example app listening on http://localhost:${port}`)
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})