const {
    User
} = require('../data/index');

const {
    generateToken
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const add = async (firstName, lastName, username, password, email, role, nrReservations) => {
    const hashedPassword = await hash(password);
    const user = new User({
        firstName,
        lastName,
        username,
        email,
        role,
        nrReservations,
        password: hashedPassword
    })
    await user.save();
}

const authenticate = async (username, email, password) => {
    let user = null;
    if (username) {
        user = await User.findOne({ username });
        if (user === null)
            throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista !`, 404);
    }
    if (email) {
        console.log('enter in email section')
        user = await User.findOne({ email })
        if (user === null)
            throw new ServerError(`Utilizatorul inregistrat cu ${email} nu exista !`, 404);
    }

    if (await compare(password, user.password)) {
        return await generateToken({
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email,
            username,
            role: user.role,
            nrReservations: user.nrReservations,
            createdAt: user.createdAt
        });
    }
    throw new ServerError("Combinatia de username/email si parola nu este buna!", 404);
}

const getAll = async () => {
    return await User.find().populate('reservations', ['title', 'sport', 'location', 'selectedServiceOption', 'selectedHour', 'image', 'price', 'date', 'available', 'canceled']);
}

const getById = async (id) => {
    return await User.findById(id).populate('reservations', ['title', 'sport', 'location', 'selectedServiceOption', 'selectedHour', 'image', 'price', 'date', 'available', 'canceled']);

}

const updateUserRes = async (id, nrReservations) => {
    await User.findByIdAndUpdate({ _id: id }, { nrReservations: nrReservations });
}

module.exports = {
    add,
    authenticate,
    getAll,
    getById,
    updateUserRes
}