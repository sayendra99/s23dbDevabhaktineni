var express = require('express');
var router = express.Router();

var sum = 0;
var more = 0;

/* GET users listing. */
router.get('/', function(req, res, next) {
  more= more +1; 
  sum = sum+more; 
  console.log(`Sum is: ${sum}`);
  res.send(`Sum is: ${sum}`);
});

module.exports = router;