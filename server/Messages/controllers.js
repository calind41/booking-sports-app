const express = require('express');

const MessagesService = require('./services');
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

// add a message
router.post('/', async (req, res, next) => {
    const {
        user,
        fromAuser,
        inFaq,
        alreadyRead,
        alreadyResponded,
        firstName,
        lastName,
        email,
        subject,
        messageBody,
        date,
        time
    } = req.body;


    try {
        await MessagesService.add(
            user,
            fromAuser,
            inFaq,
            alreadyRead,
            alreadyResponded,
            firstName,
            lastName,
            email,
            subject,
            messageBody,
            date,
            time
        );

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});

// // get all messages
router.get('/', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    try {
        const messages = await MessagesService.getAll();
        // sort messages in to show first those that were not read, after those read but with no response and last those read and with a response
        messages.sort((m1, m2) => {
            let textA = '' + m1.alreadyRead + m1.alreadyResponded;
            let textB = '' + m2.alreadyRead + m2.alreadyResponded;

            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        });
        res.json(messages);
    } catch (err) {
        console.error(err.message);
    }
});

// get all messages from FAQ
router.get('/inFaq', async (req, res, next) => {
    try {
        const messagesInFAQ = await MessagesService.getByInFaq(true);
        res.json(messagesInFAQ);
    } catch (err) {
        console.error(err.message);
    }
});

// get all messages that support has not read 
router.get('/read', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    try {
        const messagesNotRead = await MessagesService.getByAlreadyRead(false);
        res.json(messagesNotRead);
    } catch (err) {
        console.error(err.message);
    }
});

// get all messages that support has not reponded to 
router.get('/responded', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    try {
        const messagesWithoutResponse = await MessagesService.getByAlreadyResponded(false);
        res.json(messagesWithoutResponse);
    } catch (err) {
        console.error(err.message);
    }
});

// get message by it's ID
router.get('/:id', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const message = await MessagesService.getById(id);
        res.json(message);
    } catch (err) {
        console.error(err.message);
    }
});


// Update the message meta using id
router.put('/:id', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        inFaq,
        alreadyRead,
        alreadyResponded
    } = req.body;

    try {
        await MessagesService.updateMessageMeta(id, inFaq, alreadyRead, alreadyResponded);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

// update response of the message
router.put('/response/:id', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    const {
        id
    } = req.params;

    const {
        response
    } = req.body;
    try {
        await MessagesService.updateMessageResponse(id, response);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

// // delete messages by id using an array of ids
router.delete('/deleteMessages', authorizeAndExtractToken, authorizeRoles('support'), async (req, res, next) => {
    const {
        ids
    } = req.body;

    try {
        await MessagesService.deleteByIds(ids);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;