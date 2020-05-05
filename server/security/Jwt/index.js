const jwt = require('jsonwebtoken');

const {
    ServerError
} = require('../../errors');


const options = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE
};


const generateToken = async (payload) => {

    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la codificarea tokenului!", 500);
    }
};

const verifyAndDecodeData = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

const authorizeAndExtractToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe

        const decoded = await verifyAndDecodeData(token);

        req.state = {
            decoded
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = {
    generateToken,
    authorizeAndExtractToken,
    verifyAndDecodeData
}