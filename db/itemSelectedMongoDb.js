'use strict';
const mongodb = require('./mongoDb');
const Q = require('q');
const moment = require('moment');
const ItemSelectedSchema = require('../schema/itemSelectedSchema');

class ItemSelectedMongoDb {
    constructor() { }

    insertUpdate(itemSelected) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                itemSelected.created_at = new moment().toDate();
                itemSelected.updated_at = new moment().toDate();

                var itemSelectedSchema = new ItemSelectedSchema(itemSelected);
                db.model('itemSelected').findOneAndUpdate({ itemId: itemSelected.itemId, type: itemSelected.type}, itemSelectedSchema, { upsert: true }, function (err, result) {
                    if (err) {
                        defer.reject(error.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }

    getAll(type) {
        const defer = Q.defer();
        mongodb.connect()
            .then(db => {
                const filter = type ? { type: type, selected: true } : { selected: true };
                var query = db.model('itemSelected').find(filter).sort('name');
                query.exec('find', function (err, result) {
                    if (err) {
                        defer.reject(err.message);
                    } else {
                        defer.resolve(result);
                    }
                });
            });
        return defer.promise;
    }
}

module.exports = ItemSelectedMongoDb;