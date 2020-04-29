const express = require('express');

const sportLocationsService = require('./services');

const router = express.Router();

// add a sport location 
// private route
router.post('/', async (req, res, next) => {
    const {
        title,
        sport,
        location,
        sportOptions,
        base64dataImages,
        inventory
    } = req.body;


    try {
        await sportLocationsService.add(title, sport, location, sportOptions, base64dataImages, inventory);

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});

// get all sport locations
router.get('/', async (req, res, next) => {
    try {
        const sportLocations = await sportLocationsService.getAll();
        res.json(sportLocations);
    } catch (err) {
        console.error(err.message);
    }
});

// get sport location by it's ID
router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const sportLocation = await sportLocationsService.getById(id);
        res.json(sportLocation);
    } catch (err) {
        console.error(err.message);
    }
});

// get reservations by user's ID
router.get('/sport/:sportType', async (req, res, next) => {
    const {
        sportType
    } = req.params;
    try {

        const sportLocations = await sportLocationsService.getBySportType(sportType);

        res.json(sportLocations);
    } catch (err) {
        console.error(err.message);
    }
})


// Update the sport location using id
router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        title,
        sport,
        location,
        sportOptions,
        base64dataImages,
        inventory
    } = req.body;

    try {
        await sportLocationsService.updateById(id, title, sport, location, sportOptions, base64dataImages, inventory);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

// delete reservations by id using an array of ids
router.delete('/deleteSportLocs', async (req, res, next) => {
    const {
        ids
    } = req.body;

    try {
        await sportLocationsService.deleteByIds(ids);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;