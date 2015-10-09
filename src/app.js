var express = require('express');
var util = require('util');
var path = require('path');

var routes = require('./router/routes');

// use your preferred log system ...
var logs = {
  debug: console.log.bind(console)
  , log: console.log.bind(console)
  , error: console.log.bind(console)
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

var app = express();

app.set('port', process.env.npm_package_config_port || 7000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(express.static('./public'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.home);

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

// 404
app.use(function(req, res, next) {
  logs.error("* Error 404 * " + util.inspect(req.url));
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var errcode = err.status || 500;
    logs.error("* Error (dev) "+errcode+" *: " + JSON.stringify(req));
    res.status(errcode);
    res.render('error', {
      status: err.status,
      error: err.name,
      message: util.inspect(err.message),
      stack: err.stack
    });
  });
}

// production
app.use(function(err, req, res, next) {
  var errcode = err.status || 500;
  res.render('error', {
    status: err.status,
    error: err.name,
    message: util.inspect(err.message),
    stack: {}
  });
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::: //

var server = app.listen(app.get('port'), function() {
  logs.log('Express server listening on port:' + server.address().port + ' (pid:' + process.pid + ')');
});