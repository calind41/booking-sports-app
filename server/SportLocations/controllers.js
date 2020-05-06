const express = require('express');

const sportLocationsService = require('./services');
const router = express.Router();

const {
    validateFields
} = require('../utils');
const {
    ServerError
} = require('../errors');
const {
    authorizeAndExtractToken
} = require('../security/Jwt');
const {
    authorizeRoles
} = require('../security/Roles');

// add a sport location 
// private route
router.post('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        title,
        sport,
        location,
        district,
        address,
        sportOptions,
        base64dataImages,
        inventory
    } = req.body;


    try {
        await sportLocationsService.add(title, sport, location, district, address, sportOptions, base64dataImages, inventory);

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

// get  sportLocations  by sport category from all or a single district
router.get('/sport/:sportType/:district', async (req, res, next) => {
    const {
        sportType,
        district

    } = req.params;

    try {

        // district = 0 -> all districts
        const sportLocations = await sportLocationsService.getBySportType(sportType, district);
        console.log(sportLocations);
        res.json(sportLocations);
    } catch (err) {
        console.error(err.message);
    }
})

// Update the sport location using id
router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        title,
        sport,
        location,
        district,
        address,
        sportOptions,
        oldImages,
        base64dataImages,
        inventory
    } = req.body;

    try {
        await sportLocationsService.updateById(id, title, sport, location, district, address, sportOptions, oldImages, base64dataImages, inventory);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

// delete reservations by id using an array of ids
router.delete('/deleteSportLocs', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
    const {
        ids
    } = req.body;
    console.log(ids);

    try {
        await sportLocationsService.deleteByIds(ids);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;