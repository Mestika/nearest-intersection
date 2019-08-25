const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

/**
 * Create Express server.
 */
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(routes);

/**
 * CORS
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/**
 * CAPTURE 404 ERRORS
 */
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

/**
 * GENERAL FUNCTION FOR CAPTURING ERRORS
 */
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  })
});
module.exports = app;