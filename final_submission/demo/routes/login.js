const express = require('express');
const router = express.Router();

router.get('/views/login', (req, res) => {
  res.render('login'); // Assuming you are rendering a login page
});

module.exports = router;
