const express = require('express');
const router = require('routes/routes.js');
const bodyParser = require('body-parser');
require('./db').connect();

const app = express();

app.use(bodyParser.json());

app.use(router);
  
const port = process.env.PORT || 8391;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
