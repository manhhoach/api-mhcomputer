const express = require('express')
const app = express()
require('dotenv').config();
const route = require('./routes')
const cors = require('cors')
const {responseWithError}=require('./utils/response')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Welcome to MH-Computer!')
})

app.use(route)

app.use((err, req, res, next)=>{
  console.log('err in app: ',err);
  res.status(err.statusCode || 500).json(responseWithError(err))
})



module.exports=app