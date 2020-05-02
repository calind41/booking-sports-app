const { Reservation, User } = require('../data/index');

const add = async (
    userId, title, sport, location, selectedServiceOption, selectedHour, image, price, date, available, canceled
) => {
    const reservation = new Reservation({
        userId,
        title,
        sport,
        location,
        selectedServiceOption,
        selectedHour,
        image,
        price,
        date,
        available,
        canceled
    });

    await reservation.save();
    // update user's reservations field
    await User.findByIdAndUpdate(userId, { $push: { "reservations": reservation } }, { safe: true, upsert: true });

};

const getAll = async () => {
    return await Reservation.find();
}

const getById = async (id) => {
    return await Reservation.findById(id);
}

const getByUserId = async (id) => {
    return await Reservation.find({ userId: id });
}

const updateById = async (id) => {
    await Reservation.findByIdAndUpdate(id, { canceled: true });
}


// Site.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})

const deleteByIds = async (ids) => {
    let r = await Reservation.findById(ids[0]);
    const userId = r.userId;
    let user = await User.findById(userId).populate("reservations", ['_id']);

    console.log('ids is ', ids);
    let userRes = user.reservations;
    let userResAfterUpdate = userRes.filter((res) => {
        if (ids.includes(res._id.toString())) {
            console.log('includesssss');
            return false;
        }
        else {
            return true;
        }
    });
    console.log('after update ', userResAfterUpdate);
    await User.findByIdAndUpdate(userId, { reservations: userResAfterUpdate });
    await Reservation.deleteMany({ _id: ids })
}
module.exports = {
    add,
    getAll,
    getById,
    getByUserId,
    updateById,
    deleteByIds,
}

