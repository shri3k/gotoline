var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var redis = require('redis');
var config = require('./config/');
var app = module.exports = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
var CORS = function(req, res, next) {
  res.set('Access-Control-Allow-Origin', '*');
  next();
};

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(CORS);
app.use(express.static(path.join(__dirname, 'public')));

app.db = redis.createClient(config.db.port, config.db.host, config.db.auth || '');
app.db.on('connect', function() {
  console.log("connected to the db");
});

/* pilot stage
 * probably extend this in future
 */
app.db.getIt = function(key, cb) {
  var multi = this.multi();
  var keySplit = key.split("val:")[1];
  var hitKey = keySplit ? "hit:" + keySplit : "hit:" + key;
  if (!keySplit) {
    process.stdout.write(key + "looks out of format");
  }
  multi.incr(hitKey);
  multi.get(key);
  multi.exec(cb);
};

var routes = require('./routes');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
