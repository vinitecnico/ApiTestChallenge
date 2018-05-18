const ItemSelectedMongoDb = require('../db/itemSelectedMongoDb');
const _ = require('lodash');
const Q = require('q');

class ItemSelectedMiddleware {
    constructor() { }

    insertUpdate(itemSelected) {
        const defer = Q.defer();
        const itemSelectedMongoDb = new ItemSelectedMongoDb();
        itemSelectedMongoDb.insertUpdate(itemSelected)
            .then(response => {
                defer.resolve(response);
            })
            .catch(error => {
                defer.reject(error);
            });

        return defer.promise;
    }

    getAll(type) {
        const defer = Q.defer();
        const itemSelectedMongoDb = new ItemSelectedMongoDb();
        itemSelectedMongoDb.getAll(type)
            .then(response => {
                defer.resolve(response);
            })
            .catch(error => {
                defer.reject(error);
            });

        return defer.promise;
    }

    getSelected(items, type) {
        const defer = Q.defer();
        if (!items || items.length == 0) {
            defer.resolve(items);
        }

        this.getAll(type)
            .then(itemsSelected => {
                if (!itemsSelected || itemsSelected.length == 0) {
                    defer.resolve(items);
                } else {
                    _.each(itemsSelected, function (x) {
                        const index = _.findIndex(items, function (y) { return y.itemId == x.itemId });
                        if (index != -1) {
                            items[index].selected = true;
                        }
                    });
                    defer.resolve(items);
                }
            })
            .catch(error => {
                defer.reject(responseFormat.error(error));
            });

        return defer.promise;
    }
}

module.exports = ItemSelectedMiddleware;