
const express = require('express');

const app = express();

const port = 3003;

var cors = require('cors');

var routes = require('./routes/index').routes;

var bodyParser = require('body-parser');

const proxy = require('http-proxy-middleware');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: /*'http://3.134.117.20:3001'*/'http://localhost:3000', credentials: true }));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(express.static('public'))

app.use('/uploads', express.static('uploads'));

app.use('/api', routes);