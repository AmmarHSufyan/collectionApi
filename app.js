var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var favicon = require('serve-favicon');
var cors = require('cors')
var app = express()
 
app.use(cors())
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

var setpermission = function (req, res, next) {

  res.setHeader('Access-Control-Allow-Methods', '*')

  res.setHeader('Access-Control-Allow-Origin', '*')

  res.setHeader('Access-Control-Allow-Headers', '*')

  res.setHeader('Access-Control-Allow-Credentials', true);

  //intercepts OPTIONS method
  if ('OPTIONS' === req.method) {
    //respond with 200
    res.send(200);
  }
  else
    next();
}

app.get('/', function (req, res, next) {
  res.send("Donation Box Collection API");
});

app.post('/locations',setpermission, function (req, res, next) {

  var lat = req.body.lat;
  var long = req.body.long;

  res.status(200).json({lat, long});

});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
