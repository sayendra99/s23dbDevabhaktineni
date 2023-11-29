var express = require('express');
var passport = require('passport');
var router = express.Router();
var Account = require('../models/account'); 
router.get('/', function (req, res) {
  res.render('index', { title: 'Guitar App', user: req.user });
});

router.get('/register', function (req, res) {
  res.render('register', { title: 'Guitar App Registration' });
});

router.post('/register', function (req, res) {
  Account.findOne({ username: req.body.username })
    .then(function (user) {
      if (user) {
        console.log("User already exists: " + req.body.username);
        return res.render('register', {
          title: 'Registration',
          message: 'User already exists',
          Account: req.body.username
        });
      }

      let newAccount = new Account({ username: req.body.username });
      Account.register(newAccount, req.body.password, function (err, user) {
        if (err) {
          console.error("Database creation issue: " + err);
          return res.render('register', {
            title: 'Registration',
            message: 'Database creation issue',
            Account: req.body.username
          });
        }

        console.log('Registration successful, redirecting...');
        res.redirect('/login'); // Redirect to login after successful registration
      });
    })
    .catch(function (err) {
      console.error("Registration error: " + err);
      return res.render('register', {
        title: 'Registration',
        message: 'Registration error',
        Account: req.body.username
      });
    });
});

router.get('/login', function (req, res) {
  res.render('login', { title: 'Guitar App Login', user: req.user });
});

router.post('/login', passport.authenticate('local'), function (req, res) {
  res.redirect('/'); // Redirect to the home page after successful login
});

router.get('/logout', function (req, res) {
  req.logout(); // Simply logout without a callback function
  res.redirect('/'); // Redirect to the home page after logout
});

router.get('/ping', function (req, res) {
  res.status(200).send("pong!");
});

module.exports = router;
