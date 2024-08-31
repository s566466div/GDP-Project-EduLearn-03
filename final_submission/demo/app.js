// Import necessary modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const errorRouter = require('./routes/error'); // Added route for error page

const app = express();

// Middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Route setup
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);

// Serve error page
app.use('/error', errorRouter);

// 404 Error handler: Respond with a JSON message instead of an HTML file
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Global Error handler: Catch all other errors and respond with JSON
app.use((err, req, res, next) => {
  console.error('Error stack:', err.stack);
  res.status(err.status || 500).json({ error: 'Internal Server Error' });
});

// Export the app object for use by the server
module.exports = app;
