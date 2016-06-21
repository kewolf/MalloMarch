var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');


//other logging stuff:
var JL = require('jsnlog').JL;
var winston = require('winston');

var clientLogger = new winston.Logger({
    level: 'info',
    transports: [
        new (winston.transports.File)({
            name: 'somefile.log',
            filename: 'logs/ICADperformanceTest.log',
            maxFiles: 100,
            maxsize: 100000,
            colorize: true
        })]
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//If we want to have the views be html files...
//Doing this, we would have to re-write the error.jade file.
//app.engine('html', require('ejs').renderFile);
//app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);


// jsnlog.js on the client by default sends log messages to /jsnlog.logger, using POST.
app.post('*.logger', function (req, res) {
    //console.log(JSON.parse(JSON.stringify(req.body)));
    //console.log("Lenght of Arrray: " + req.body.lg.length);
    var numLogs = req.body.lg.length;
    for (var i = 0; i < numLogs; i++) {
        var aLog = req.body.lg[i];
        var msg = aLog["m"];
        var loggerName = aLog["n"];
        var time = new Date(aLog["t"]);
        var clientIP = req.connection.remoteAddress;

        // could also incorporate level
        var lvl = parseInt(aLog["l"]);

        // Create JSON message from the parameters and send that to our Winston logger
        clientLogger.log('info', msg, {clientTimestamp: time, clientIP: clientIP, loggerName: loggerName});
    }
    res.send('');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
