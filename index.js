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

app.use('/api/song/:songID/relatedtracks', proxy({
  target: 'ec2-54-175-244-241.compute-1.amazonaws.com',
  changeOrigin: true
}))

app.use('/api/song/:songID/description', proxy({
  target: 'ec2-52-32-197-59.us-west-2.compute.amazonaws.com',
  changeOrigin: true
}))

app.use('/api/song/:songID/comments', proxy({
  target: '172.31.35.99',
  changeOrigin: true
}))


app.use('api/song/:songId/song_id', proxyserver);
app.use('api/song/:songId/song_comment', proxyserver);
app.listen(port, () => {
  console.log(`port is running on ${port}`)
});