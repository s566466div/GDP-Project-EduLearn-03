var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
// Remove or comment out if you are not using errorRouter
// var errorRouter = require('./routes/error');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
// Remove or comment out if you are not using errorRouter
// app.use('/error', errorRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).sendFile(path.join(__dirname, 'views/404.html'));
});

// Error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.sendFile(path.join(__dirname, 'views/error.html'));
});

module.exports = app;
