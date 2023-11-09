var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('guitar', { title: 'Search results for guitar' });
});

module.exports = router;