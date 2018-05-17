'use strict';
const request = require('request');
const responseFormat = require('../helper/responseFormatHelper');
const _ = require('lodash');

module.exports = function (app) {
    app.get('/api/brewdogbeers', function (req, res) {
        let query = '?page=1&per_page=10';
        if (req.query && req.query.name) {
            query += '&beer_name=' + req.query.name
        }

        const options = {
            uri: 'https://api.punkapi.com/v2/beers' + query,
            method: 'GET',
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const request = _.map(body, function(x) {
                    return {
                        id: x.id,
                        name: x.name,
                        description: x.description,
                        image_url: x.image_url,
                        type: 'brewdogBeers'
                    }
                });
                res.status(200).json(responseFormat.success(request));
            } else {
                res.status(500).json(responseFormat.error(err.message));
            }
        }

        request(options, callback);
    });
};