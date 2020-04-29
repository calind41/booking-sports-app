const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const ReservationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
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
    selectedServiceOption: {
        type: String,
        required: true
    },
    selectedHour: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    available: {
        type: Boolean,
        required: true
    },
    canceled: {
        type: Boolean,
        required: true
    }
}, { timestamps: true })


module.exports = Reservation = mongoose.model('reservations', ReservationSchema);