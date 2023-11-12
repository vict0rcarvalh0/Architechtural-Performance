const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('config');

module.exports = () => {
  const app = express();

  app.set('port', 8080 || config.get('server.port'));

  app.use(bodyParser.json());

  return app;
};