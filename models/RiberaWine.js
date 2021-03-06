'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiberaWineSchema = Schema({
    type: String,
    name: String,
    information: String,
    cupPrice: { type: Number, default: 10 },
    bottlePrice: { type: Number, default: 10 }
});

module.exports = mongoose.model('ribera-wines', RiberaWineSchema);