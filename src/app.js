const express = require('express')
const app = express()
require('dotenv').config();
const route = require('./routes')
const cors = require('cors')
const cookieParser=require('cookie-parser')

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to MH-Computer!')
})

app.use(route)



module.exports=app