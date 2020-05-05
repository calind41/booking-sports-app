const {
    User
} = require('../data/index');

const {
    generateToken,
    verifyAndDecodeData
} = require('../security/Jwt');

const {
    ServerError
} = require('../errors');

const {
    hash,
    compare
} = require('../security/Password');

const add = async (firstName, lastName, username, password, email, role, nrReservations, confirmed) => {
    const hashedPassword = await hash(password);
    const user = new User({
        firstName,
        lastName,
        username,
        email,
        role,
        nrReservations,
        password: hashedPassword,
        confirmed
    })
    await user.save();
    await sendConfirmationEmail(email, user);
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

        if (user.confirmed)
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
        else {
            return null;
        }
    }
    throw new ServerError("Combinatia de username/email si parola nu este buna!", 404);
}

const sendConfirmationEmail = async (to, user) => {
    const nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'genmotionbooking@gmail.com',
            pass: 'supportpassword'
        }
    });
    const token = await generateToken({
        userId: user._id
    });

    //async email
    const url = `http://localhost:5000/api/v1/users/confirmation/${token}`;
    const mailOptions = {
        from: 'genmotionbooking@gmail.com',
        to: to,
        subject: 'Register Confirmation Email',
        html: `Please click this email to confirm your account: <a href='${url}'>${url}</a>`
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
const verifyTokenAndUpdateConfirmed = async (token) => {
    const decoded = await verifyAndDecodeData(token);
    const id = decoded.userId;
    await User.findByIdAndUpdate({ _id: id }, { confirmed: true });
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
    updateUserRes,
    verifyTokenAndUpdateConfirmed
}