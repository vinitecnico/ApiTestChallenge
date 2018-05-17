
'use strict';

const ItemSelectedMiddleware = require('../middlewares/itemSelectedMiddleware');
const responseFormat = require('../helper/responseFormatHelper');
const config = require('../config');
const Q = require('q');

module.exports = function (app) {
    app.get('/api/itemselected', (req, res) => {
        const itemSelectedMiddleware = new ItemSelectedMiddleware();
        itemSelectedMiddleware.getAll()
            .then(function (response) {
                res.status(200).json(responseFormat.success(response));
            })
            .catch(function (e) {
                res.status(500).json(responseFormat.error(e));
            });
    });

    app.post('/api/itemselected', (req, res) => {
        const select = req.body;
        const itemSelectedMiddleware = new ItemSelectedMiddleware();
        itemSelectedMiddleware.insertUpdate(select)
            .then(function (response) {
                res.status(200).json(responseFormat.success(response));
            })
            .catch(function (e) {
                res.status(500).json(responseFormat.error(e));
            });
    });
};