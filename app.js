const express = require('express');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes');
const errorHandler = require('errorhandler');
require('./database');

const app = express();
exports.app = app;
const port = process.env.PORT || 3000;
// session config require should be required after exports.app = app, elsewhere cycle dependencies on exports.app
require('./config/session.config')
// passport doit être require toujours après la configuration de session
require('./config/passport.config')

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler());
} else {
  app.use((err, req, res, next) => {
    const code = err.code || 500;
    res.status(code).json({
      code: code,
      message: code === 500 ? null : err.message,
    });
  });
}

app.listen(port);
