const express = require('express');

const MessagesService = require('./services');

const router = express.Router();

// add a message
// private route
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
router.get('/', async (req, res, next) => {
    try {
        const messages = await MessagesService.getAll();
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
router.get('/read', async (req, res, next) => {
    try {
        const messagesNotRead = await MessagesService.getByAlreadyRead(false);
        res.json(messagesNotRead);
    } catch (err) {
        console.error(err.message);
    }
});

// get all messages that support has not reponded to 
router.get('/responded', async (req, res, next) => {
    try {
        const messagesWithoutResponse = await MessagesService.getByAlreadyResponded(false);
        res.json(messagesWithoutResponse);
    } catch (err) {
        console.error(err.message);
    }
});

// get message by it's ID
router.get('/:id', async (req, res, next) => {
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
router.put('/:id', async (req, res, next) => {
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
router.put('/response/:id', async (req, res, next) => {
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
router.delete('/deleteMessages', async (req, res, next) => {
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