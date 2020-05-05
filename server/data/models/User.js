const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    confirmed: {
        type: Boolean,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['client', 'support', 'admin'],
    },
    reservations: [{
        type: Schema.Types.ObjectId,
        ref: 'reservations'
    }],
    nrReservations: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = User = mongoose.model('users', UserSchema);