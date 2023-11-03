var express = require('express');
var router = express.Router();

// Define the "computation" route
router.get('/', function(req, res, next) {
  
  var x = parseFloat(req.query.x) || (Math.random() * 10); 
  var angleRadians = calcAngle(x, 10); // Assuming a hypotenuse of 10

  // Format the response string
  var responseString = `Math.acos applied to ${x} is ${angleRadians}`;
  // Send the response
  res.send(responseString);
});
// Helper function to calculate angle using Math.acos
function calcAngle(adjacent, hypotenuse) {
  return Math.acos(adjacent / hypotenuse);
}
module.exports=router;