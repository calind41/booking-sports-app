const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const SportOptionSchema = new Schema({

    serviceOption: {
        type: String,
        required: true
    },
    availableHours: [{
        type: String,
        required: true
    }]
}, { timestamps: true })


module.exports = SportOption = mongoose.model('sportOptions', SportOptionSchema);