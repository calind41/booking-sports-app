const { Reservation, User } = require('../data/index');

const add = async (
    userId, title, sport, location, selectedServiceOption, selectedHour, image, price, date, available, canceled
) => {
    const reservation = new Reservation({
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
    console.log('here');
    console.log('wtf2 ', userId,
        title,
        sport,
        location,
        selectedServiceOption,
        selectedHour,
        image,
        price,
        date,
        available,
        canceled)
    await reservation.save();
    console.log('here after .save');

    await User.findByIdAndUpdate(userId, { $push: { "reservations": reservation } }, { safe: true, upsert: true });

};

// const getAll = async () => {
//     return await Product.find();
// }

// const getById = async (id) => {
//     return await Product.findById(id);
// }
// const getByCategory = async (category) => {
//     return await Product.find({ categorie: category });
// }

// const updateById = async (id, {
//     nume,
//     pret,
//     descriere,
//     poze,
//     numeBrand,
//     categorie,
//     livrare_timpi,
//     lista_atribute,
//     metode_livrari
// }) => {
//     await Product.findByIdAndUpdate(id, { nume, pret, descriere, poze, numeBrand, categorie, livrare_timpi, lista_atribute, metode_livrari });
// }

// const deleteById = async (id) => {
//     await Product.findByIdAndDelete(id);
// }
module.exports = {
    add,
    // getAll,
    // getById,
    // getByCategory,
    // updateById,
    // deleteById,
}

