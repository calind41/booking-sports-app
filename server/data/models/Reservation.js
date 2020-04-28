const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const ReservationSchema = new Schema({
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
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    available: {
        type: String,
        required: true
    },
    canceled: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = Reservation = mongoose.model('reservations', ReservationSchema);