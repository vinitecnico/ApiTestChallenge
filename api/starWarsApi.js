'use strict';
const request = require('request');
const responseFormat = require('../helper/responseFormatHelper');
const ItemSelectedMiddleware = require('../middlewares/itemSelectedMiddleware');
const _ = require('lodash');

module.exports = function (app) {
    app.get('/api/starwars', function (req, res) {
        let query = '';
        if (req.query && req.query.name) {
            query += 'search=' + req.query.name
        }
        
        const options = {
            uri: 'https://swapi.co/api/films/' + query,
            method: 'GET',
            json: true,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const request = _.map(body.results, function(x) {
                    return {
                        id: x.episode_id,
                        name: x.title,
                        description: x.opening_crawl,
                        image_url: null,
                        type: 'starwars',
                        selected: false
                    }
                });
                const itemSelectedMiddleware = new ItemSelectedMiddleware();
                res.status(200).json(responseFormat.success(itemSelectedMiddleware.getSelected(request, 'starwars')));
            } else {
                res.status(500).json(responseFormat.error(err.message));
            }
        }

        request(options, callback);
    });
};