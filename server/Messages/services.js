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
    await Message.findByIdAndUpdate(id, { inFaq, alreadyRead, alreadyResponded });
}
const updateMessageResponse = async (id, response) => {
    await Message.findByIdAndUpdate(id, { response });
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

