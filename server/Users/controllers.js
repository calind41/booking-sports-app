const express = require('express');
const UsersService = require('./services');

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
        const confirmed = false;
        const nrReservations = 0;
        await UsersService.add(firstName, lastName, username, password, email, role, nrReservations, confirmed);

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});
// const EMAIL_SECRET = 'asdf1093KMnzxcvnkljvasdu09123nlasdasdf';
router.get('/confirmation/:token', async (req, res, next) => {
    const {
        token
    } = req.params;
    try {
        console.log('IN ROUTE')
        await UsersService.verifyTokenAndUpdateConfirmed(token);
        res.redirect('http://localhost:3000/signin')
    } catch (err) {
        res.send('error dasd');
    }
})

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
        if (token === null) {
            res.status(401).json('Account Not Confirmed!');
        }
        else
            res.status(200).json(token);

    } catch (err) {
        next(err);
    }
});


router.get('/', authorizeAndExtractToken, authorizeRoles('client', 'admin'), async (req, res, next) => {
    try {
        const users = await UsersService.getAll();
        res.json(users.filter((user) => user.role === 'client'));
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('client', 'admin'), async (req, res, next) => {
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

router.put('/:id', authorizeAndExtractToken, authorizeRoles('client'), async (req, res, next) => {
    const {
        id
    } = req.params;
    const {
        nrReservations
    } = req.body;
    console.log('nr res is ', nrReservations);
    try {
        await UsersService.updateUserRes(id, nrReservations)
        res.json('nr res updated');
    } catch (err) {
        console.error(err.message);
    }
})

module.exports = router;