require('newrelic');

const express = require('express');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000;

var options = {
  target: 'http://localhost:3002'
}

var proxyserver = proxy(options);
app.use(morgan())
app.use('/song/:songId/api/song_id', proxyserver);
app.use('/song/:songId/api/song_comment', proxyserver);
app.listen(port, () => {
  console.log(`port is running on ${port}`)
});