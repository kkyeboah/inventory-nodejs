'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        requried: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    dateCreated: {
        type: Date,
        default: Date.now()
    },
    dateModified: {
        type: Date,
        default: Date.now()
    }
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;