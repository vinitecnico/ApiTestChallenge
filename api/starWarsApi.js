'use strict';
const request = require('request');
const responseFormat = require('../helper/responseFormatHelper');
const ItemSelectedMiddleware = require('../middlewares/itemSelectedMiddleware');
const config = require('../config');
const _ = require('lodash');

module.exports = function (app) {
    app.get('/api/starwars', function (req, res) {
        let query = '';
        if (req.query && req.query.name) {
            query += '?search=' + req.query.name
        }

        const options = {
            uri: config.starwars + query,
            method: 'GET',
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const request = _.map(body.results, function (x) {
                    return {
                        itemId: x.episode_id,
                        name: x.title,
                        description: x.opening_crawl,
                        image_url: null,
                        type: 'starwars',
                        selected: false
                    }
                });
                const itemSelectedMiddleware = new ItemSelectedMiddleware();
                itemSelectedMiddleware.getSelected(request, 'starwars')
                    .then(result => {
                        res.status(200).json(responseFormat.success(result));
                    })
                    .catch(error => {
                        defer.reject(responseFormat.error(error));
                    });

            } else {
                res.status(500).json(responseFormat.error(error ? error.message : response.statusCode));
            }
        }

        request(options, callback);
    });
};