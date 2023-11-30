var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
 
var passport = require('passport'); 
var LocalStrategy = require('passport-local').Strategy;
var Account = require('./models/account');
passport.use(new LocalStrategy(
  function(username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err);
      });
  })) 
 
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var GuitarRouter = require('./routes/Guitar');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');

var Account = require('./models/account');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
 
app.use(express.static(path.join(__dirname, 'public')));
 
 
require("dotenv").config();
const connectionString = process.env.MONGO_CON;
mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: false,useUnifiedTopology: false});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
 
//Get the default connection
var db = mongoose.connection;
// passport config
// Use the existing connection
// The Account model
 
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
  console.log("Connection to DB succeeded")
});
 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Guitar', GuitarRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// We can seed the collection if needed on server start
async function recreateDB(){
  // Delete everything
  await Guitar.deleteMany();
  let instance1 = new Guitar({ type: "Acoustic", cost: 45088, material: "tonewoods" });
  instance1.save().then(doc=>{
  console.log("First object saved")}
  ).catch(err=>{
  console.error(err)
  });
  let instance2 = new Guitar({ type: "Electric", cost: 12789, material: "maple"});
  instance2.save().then(doc=>{
  console.log("second object saved")}
  ).catch(err=>{
  console.error(err)
  });
  let instance3 = new Guitar({type: "Classical", cost: 45000, material: "synthetic"});
  instance3.save().then(doc=>{
  console.log("third object saved")}
  ).catch(err=>{
  console.error(err)
  });
  }
let reseed = false;
  if (reseed) {
    recreateDB();
}
module.exports = app;