const express = require('express')
const app = express()
require('dotenv').config();
const route = require('./routes')
const cors = require('cors')
const helmet=require('helmet')
const compression=require('compression')
const {responseWithError}=require('./utils/response')


app.use(cors());
app.use(compression({
  //level: 6
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  let str="hello cụ mạnh"
  res.send(str.repeat(90000))
  //res.send('Welcome to MH-Computer!')
})

app.use(route)

app.use((err, req, res, next)=>{
  console.log('err in app: ',err);
  res.status(err.statusCode || 500).json(responseWithError(err))
})



module.exports=app