var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    id: { type: number, required: true },
    name: { type: string, required: true },
    description: string,
    type: string,
    img: string,
    selected: {type: boolean, default: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('itemSelected', categorySchema)