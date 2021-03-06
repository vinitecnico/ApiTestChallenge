const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    next();
});

app.get('/', function (req, res) {
    res.status(200).json({
        title: 'Engineer Challenge ', route: [{
            method: 'GET',
            url: '/api/brewdogbeers',
            query: 'name - optional'
        }, {
            method: 'GET',
            url: '/api/starwars',
            query: 'name - optional'
        }, {
            method: 'GET',
            url: '/api/itemselected'
        }, {
            method: 'POST',
            url: '/api/itemselected'
        }]
    });
});

const brewdogBeersApi = require('./api/brewdogBeersApi')(app);
const starWarsApi = require('./api/starWarsApi')(app);
const itemSelectedApi = require('./api/itemSelectedApi')(app);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function () {
    console.log('Node app is running on port', app.get('port'));
});