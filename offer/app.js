var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var utils = require('./utils/utils');
var config = require('./config/config');

mongoose.connect('mongodb://localhost/xooffer');

var index = require('./routes/index');
var offer = require('./api/offer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// var test1 = studio('test1');
// studio(function test2(){
//     //call remote service
//     return test1().then(function(message){
//         console.log(message);
//     }).catch(function(err){
//         console.error(err);
//     });
// });
//
// var _test2 =  studio('test2');
//
// setInterval(_test2,1500);
app.use('/', index);

/*******************************
          API ROUTES
*******************************/

app.use(utils.checkRequest)
app.use('/api',offer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

module.exports = app;
