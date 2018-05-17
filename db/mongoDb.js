'use strict';
const mongoose = require('mongoose');
let Q = require('q');
const config = require('../config');

module.exports = {

    connect: () => {        
        return mongoose.connect(config.database);
    },
    close: (db) => {
        db.close();
    }
};