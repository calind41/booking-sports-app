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
    sportOpts: [{
        type: Schema.Types.ObjectId,
        ref: 'sportOptions'
    }],
    images: [{
        type: String,
    }],
    inventory: {
        type: String,
    }
}, { timestamps: true })


module.exports = SportLocation = mongoose.model('sportLocations', SportLocationSchema);