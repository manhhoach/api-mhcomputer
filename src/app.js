const express = require('express')
const app = express()
require('dotenv').config();
const route = require('./routes')
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to MH-Computer!')
})

app.use(route)



module.exports=app