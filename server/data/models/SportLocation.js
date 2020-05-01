const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const SportLocationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    sport: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    district: {
        type: Number,
        required: true
    },
    address: {
        type: String
    },
    sportOpts: [{
        type: Schema.Types.ObjectId,
        ref: 'sportOptions'
    }],
    images: [{
        type: String,
    }],
    inventory: [{
        title: {
            type: String,
            required: true
        },
        value: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })


module.exports = SportLocation = mongoose.model('sportLocations', SportLocationSchema);