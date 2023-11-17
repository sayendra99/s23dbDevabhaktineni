var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var guitarRouter = require('./routes/guitar');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var resourceRouter = require('./routes/resource');

var app = express();

var Account =require('./models/Account');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/guitar', guitarRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

require('dotenv').config();
const connectionString = process.env.MONGO_CON

mongoose.connect(connectionString); 45


//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

var Guitar = require("./models/Guitar");

// We can seed the collection if needed on

async function recreateDB() {
  // Delete everything
  await Guitar.deleteMany();
  let instance1 = new
    Guitar({ type: "Acoustic", cost: 45088, material: "tonewoods" });
  instance1.save().then(doc => {
    console.log("First object saved")
  }
  ).catch(err => {
    console.error(err)
  });

  let instance2 = new
    Guitar({ type: "Electric", cost: 12789, material: "maple" });
  instance2.save().then(doc => {
    console.log("Second object saved")
  }
  ).catch(err => {
    console.error(err)
  });

  let instance3 = new
    Guitar({ type: "Classical", cost: 45000, material: "synthetic" });
  instance3.save().then(doc => {
    console.log("Third object saved")
  }
  ).catch(err => {
    console.error(err)
  });
}
let reseed = true;
if (reseed) { recreateDB(); }



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler middleware
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)



