const express = require('express');

const ReservationsService = require('./services');

const router = express.Router();


// add a reservation 
// private route
router.post('/', async (req, res, next) => {
    const {
        userId,
        title,
        sport,
        location,
        selectedServiceOption,
        selectedHour,
        image,
        price,
        date,
        available,
        canceled
    } = req.body;
    console.log(userId);

    try {
        await ReservationsService.add(userId, title, sport, location, selectedServiceOption, selectedHour, image, price, date, available, canceled);

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});

// get all reservations
router.get('/', async (req, res, next) => {
    try {
        const reservations = await ReservationsService.getAll();
        res.json(reservations);
    } catch (err) {
        console.error(err.message);
    }
});

// get reservation by ID
router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const reservation = await ReservationsService.getById(id);
        res.json(reservation);
    } catch (err) {
        console.error(err.message);
    }
});

// get reservations by user's ID
router.get('/user/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {

        const reservations = await ReservationsService.getByUserId(id);

        res.json(reservations);
    } catch (err) {
        console.error(err.message);
    }
})


// Update the reservation : cancel  the reservation
router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        await ReservationsService.updateById(id);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

// delete reservations by id using an array of ids
router.delete('/deleteRes', async (req, res, next) => {
    const {
        ids
    } = req.body;

    try {
        await ReservationsService.deleteByIds(ids);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;