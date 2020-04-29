const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema 
const MessageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    fromAuser: {
        type: Boolean,
        required: true
    },
    inFaq: {
        type: Boolean,
        required: true
    },
    alreadyRead: {
        type: Boolean,
        required: true
    },
    alreadyResponded: {
        type: Boolean,
        required: true
    },
    response: {
        type: String,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String,
        required: true
    },
    messageBody: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },

}, { timestamps: true })


module.exports = Message = mongoose.model('messages', MessageSchema);