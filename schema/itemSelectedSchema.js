var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema = new Schema({
    itemId: { type: Number, required: true },
    name: { type: String, required: true },
    description: String,
    type: String,
    img: String,
    selected: {type: Boolean, default: true},
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('itemSelected', categorySchema)