'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FishSchema = Schema({
    name: String,
    description: String,
    price: { type: Number, default: 10 }
});

module.exports = mongoose.model('Fishs', FishSchema);