const express = require('express')
const app = express()
require('dotenv').config();
const route = require('./routes')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const { responseWithError } = require('./utils/response')
const path=require('path')


app.use(cors());
app.use(compression({
  //level: 6
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(route)

app.use((err, req, res, next) => {
  console.log('err in app: ', err);
  res.status(err.statusCode || 500).json(responseWithError(err))
})



module.exports = app