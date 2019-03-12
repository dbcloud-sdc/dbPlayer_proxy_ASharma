require('newrelic');

const express = require('express');
const proxy = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 3000;

var options = {
  target: process.env.TARGET_URL || 'http://localhost:3002'
}

var proxyserver = proxy(options);
app.use('/song/:songId/api/song_id', proxyserver);
app.use('/song/:songId/api/song_comment', proxyserver);
app.listen(port, () => {
  console.log(`port is running on ${port}`)
});