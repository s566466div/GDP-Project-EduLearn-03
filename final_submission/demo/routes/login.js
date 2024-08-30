var express = require('express');
var router = express.Router();

// GET request for login page
app.get('/views/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login.html'));
});

// POST request for login form
router.post('/', function(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  if (username === 'admin' && password === 'admin') {
    res.redirect('/dashboard');
  } else {
    res.sendFile(path.join(__dirname, '../views/login.html'));
  }
});

module.exports = router;
