const express = require('express');

const UsersService = require('./services');

const router = express.Router();


router.post('/register', async (req, res, next) => {
    const {
        firstName,
        lastName,
        username,
        password,
        email,
    } = req.body;
    try {
        // const role = 'support';
        // const role = 'admin';
        const role = 'client';
        const nrReservations = 0;
        await UsersService.add(firstName, lastName, username, password, email, role, nrReservations);

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});

router.post('/login', async (req, res, next) => {
    const {
        username,
        email,
        password
    } = req.body;
    console.log('we are here');
    console.log(username);
    console.log(email);

    try {
        const token = await UsersService.authenticate(username, email, password);

        res.status(200).json(token);

    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const users = await UsersService.getAll();
        res.json(users);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const user = await UsersService.getById(id);
        res.json(user);
    } catch (err) {
        console.error(err.message);
    }
});

router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        nr_comenzi
    } = req.body;
    try {
        await ClientsService.updateById(id, nr_comenzi)
        res.json('client updated');
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;