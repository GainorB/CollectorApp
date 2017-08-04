require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const port = process.env.PORT || '3000';
const logger = require('morgan');
const passport = require('passport');

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// CORS
app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// SECURITY
app.disable('x-powered-by');

// CONTROLLERS
app.use('/users', require('./controllers/usersController'));
app.use('/collections', require('./controllers/collectionsController'));

// LANDING PAGE
app.get('/', (req, res, next) => {
    res.send('Hello World');
})

// START SERVER
app.set('port', port);
server.listen(port);
console.log('Server listening on port ' + port);

// CATCH 404 AND FORWARD TO ERROR HANDLER
app.use((req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});

module.exports = app;