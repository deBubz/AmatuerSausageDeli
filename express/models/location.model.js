const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    openTime: {
        type: Date,
        required: true
    },
    closeTime: {
        type: Date,
        required: true
    },
    isLeashRequired: {
        type: Boolean,
        default: false,
        required: true
    },
    hasToliet: {
        type: Boolean,
        default: false,
        required: true
    },
    hasBubbler: {
        type: Boolean,
        default: false,
        required: true
    },
    hasParking: {
        type: Boolean,
        default: false,
        required: true
    },
    parkImageUrl: {
        type: String,
        default: "",
        required: false,
    },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;