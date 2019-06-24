const port = process.env.PORT || 8391;
const os = require('os');
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use('/media', express.static(path.join(__dirname, './images')));

const server = http.createServer(app);

(async () => {
  console.clear();
  await require('./db').connect();
  const api = require('./api');
  const { Router } = require('./remote-object-server');

  new Router(api, {server, path: '/api'});
})();

exports.port = port;
exports.hostname = os.hostname();

server.listen(port);
server.on('listening', () => {
  console.log('server listening on port: ' + port);
});