const express = require('express');
const path = require('path');
const router = express.Router();

// Serve error page
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views/error.html'));
});

module.exports = router;