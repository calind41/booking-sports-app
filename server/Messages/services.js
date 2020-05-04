const { Message } = require('../data/index');

// add a sport location
const add = async (
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
) => {

    let message;
    if (fromAuser) {
        message = new Message({
            user,
            fromAuser,
            inFaq,
            alreadyRead,
            alreadyResponded,
            subject,
            messageBody,
            date,
            time
        });
        await message.save();
    } else {
        message = new Message({
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
        });
        await message.save();
    }

};


const getAll = async () => {
    return await Message.find().populate('user', ['firstName', 'lastName', 'username', 'email']);
}

const getByInFaq = async (inFaq) => {
    return await Message.find({ inFaq: inFaq }).populate('user', ['firstName', 'lastName', 'username', 'email']);
}

const getByAlreadyRead = async (alreadyRead) => {
    return await Message.find({ alreadyRead: alreadyRead }).populate('user', ['firstName', 'lastName', 'username', 'email']);
}

const getByAlreadyResponded = async (alreadyResponded) => {
    return await Message.find({ alreadyResponded: alreadyResponded }).populate('user', ['firstName', 'lastName', 'username', 'email']);
}

const getById = async (id) => {
    return await Message.findById(id).populate('user', ['firstName', 'lastName', 'username', 'email']);
}

const updateMessageMeta = async (id, inFaq, alreadyRead, alreadyResponded) => {
    if (inFaq !== undefined && alreadyRead !== undefined && alreadyResponded !== undefined) {
        await Message.findByIdAndUpdate(id, { inFaq, alreadyRead, alreadyResponded });

    } else if (inFaq !== undefined && alreadyRead !== undefined) {
        await Message.findByIdAndUpdate(id, { inFaq, alreadyRead });

    } else if (inFaq !== undefined && alreadyResponded !== undefined) {
        await Message.findByIdAndUpdate(id, { inFaq, alreadyResponded });
    } else if (alreadyRead !== undefined && alreadyResponded !== undefined) {
        await Message.findByIdAndUpdate(id, { alreadyRead, alreadyResponded });

    } else if (inFaq !== undefined) {
        await Message.findByIdAndUpdate(id, { inFaq });

    } else if (alreadyRead !== undefined) {
        await Message.findByIdAndUpdate(id, { alreadyRead });

    } else if (alreadyResponded !== undefined) {
        await Message.findByIdAndUpdate(id, { alreadyResponded });

    }
}
const updateMessageResponse = async (id, response) => {
    await Message.findByIdAndUpdate(id, { response });

    let msg = await Message.findById(id).populate('user', ['email']);
    const to = msg.fromAuser ? msg.user.email : msg.email;
    const subject = msg.subject;
    sendMail(to, subject, response)
}
const sendMail = (to, subject, response) => {
    const nodemailer = require('nodemailer');

    console.log('to is ', to);
    console.log('subject is ', subject);
    console.log('response is ', response);

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'genmotionbooking@gmail.com',
            pass: 'supportpassword'
        }
    });

    var mailOptions = {
        from: 'genmotionbooking@gmail.com',
        to: to,
        subject: subject,
        text: response
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const deleteByIds = async (ids) => {
    await Message.deleteMany({ _id: ids })
}
module.exports = {
    add,
    getAll,
    getByInFaq,
    getByAlreadyRead,
    getByAlreadyResponded,
    getById,
    updateMessageMeta,
    updateMessageResponse,
    deleteByIds,
}

