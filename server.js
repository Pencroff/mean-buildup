/**
 * Created by Pencroff on 08-Sep-15.
 */


var express = require('express');
var app = express();

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var conf = require('kea-config');
conf.setup('./config');

var authApi = require('./server/auth-api');
var publicApi = require('./server/public-api');
var protectedApi = require('./server/protected-api');

app.set('view engine', 'jade'); // set up ejs for templating
app.engine('jade', require('jade').__express);
app.set('views', './server/views');

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // get information from html forms

app.get('/', function (req, res) {
    return res.render('home.jade');
});

app.get('/app', function (req, res) {
    return res.render('app.jade');
});

app.use('/auth', authApi);
app.use('/public', publicApi);
app.use('/protected', protectedApi);

app.use('/static', express.static('./client'));

app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        return res.render('404.jade', { url: req.url });
    }

    // respond with json
    if (req.accepts('json')) {
        return res.send({ error: 'Not found' });
    }

    // default to plain-text. send()
    return res.type('txt').send('Not found');
});

var server = app.listen(conf.get('server.port'), function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});