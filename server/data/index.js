const mongoose = require('mongoose');
const url = 'mongodb+srv://admin_user:admin_password@maincluster-hrl95.mongodb.net/test?retryWrites=true&w=majority';

(async () => {
    try {
        await mongoose.connect(url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch (e) {
        console.trace(e);
    }
})();

const User = require('./models/User');
const Reservation = require('./models/Reservation');
const SportLocation = require('./models/SportLocation');
const SportOption = require('./models/SportOption');
const Message = require('./models/Message');

module.exports = {
    User,
    SportLocation,
    SportOption,
    Reservation,
    Message
};