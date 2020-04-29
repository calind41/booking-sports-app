const Router = require('express')();

const UsersController = require('../Users/controllers');
const ReservationsController = require('../Reservations/controllers');
const MessagesControllers = require('../Messages/controllers');
const SportLocationsController = require('../SportLocations/controllers');
const SportOptionsController = require('../SportOptions/controllers');


Router.use('/users', UsersController);
Router.use('/reservations', ReservationsController);
Router.use('/messages', MessagesControllers);
Router.use('/sportLocations', SportLocationsController);


module.exports = Router;