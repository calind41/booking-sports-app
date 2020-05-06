const { uuid } = require('uuidv4');
const { SportLocation, SportOption } = require('../data/index');
const fs = require('fs');

// add a sport location
const add = async (
    title, sport, location, district, address, sportOptions, base64dataImages, inventory
) => {

    let images = [];
    base64dataImages.map((item) => {
        let b64d;
        // console.log(base64data.charAt(9))
        const imageFormat = item.base64Data.substring("data:image/".length, item.base64Data.indexOf(";base64"))
        switch (imageFormat) {
            case "png":
                b64d = item.base64Data.replace(/^data:image\/png;base64,/, "");
                break;
            case "jpg":
                b64d = item.base64Data.replace(/^data:image\/jpg;base64,/, "");
                break;
            case "jpeg":
                b64d = item.base64Data.replace(/^data:image\/jpeg;base64,/, "");
                break;
            case "webp":
                b64d = item.base64Data.replace(/^data:image\/webp;base64,/, "");
                break;
            default:
        }
        let uid = uuid();
        let temp = item.name.split('.');
        temp.splice(1, 0, uid.substring(0, 5));
        temp[0] = temp[0] + temp[1];
        temp.splice(1, 1);
        let finalName = temp.join('.');

        // this array will be stored in mongo
        images.push('./sportLocImgs/' + finalName);

        // write image to a file
        const dirname = './sportLocImgs';
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }
        fs.writeFile(`./sportLocImgs/${finalName}`, b64d, 'base64', (err) => { })
    })

    // create sportOptions db ojects 
    let sportOpts = [];
    sportOptions.map((item) => {
        let so = new SportOption({
            serviceOption: item.serviceOption,
            availableHours: item.availableHours
        });
        sportOpts.push(so);
    });
    sportOpts.map(async (item) => await item.save())


    // // sportLocation db object
    const sportLocation = new SportLocation({
        title,
        sport,
        location,
        district,
        address,
        sportOpts,
        images,
        inventory
    });

    await sportLocation.save();
};


const getAll = async () => {
    return await SportLocation.find().populate('sportOpts', ['serviceOption', 'availableHours']);
}

const getById = async (id) => {
    return await SportLocation.findById(id).populate('sportOpts', ['serviceOption', 'availableHours']);
}

const getBySportType = async (sportType, district) => {
    if (district == 0 || district == -1) {
        return await SportLocation.find({ sport: sportType }).populate('sportOpts', ['serviceOption', 'availableHours']);
    } else
        return await SportLocation.find({ sport: sportType, district: district }).populate('sportOpts', ['serviceOption', 'availableHours']);
}


const updateById = async (
    id,
    title,
    sport,
    location,
    district,
    address,
    sportOptions,
    oldImages,
    base64dataImages,
    inventory
) => {
    // delete from sportLocImgs/ folder images related to sport location identified by id
    const slOld = await SportLocation.findById(id);
    slOld.images.map((item) => {
        if (oldImages.includes(item) === false) {
            fs.unlink(item, (err) => { if (err) { console.log(err); return; } })
        }
    });


    // -- create new db object
    let images = [];
    base64dataImages.map((item) => {
        let b64d;
        // console.log(base64data.charAt(9))
        const imageFormat = item.base64Data.substring("data:image/".length, item.base64Data.indexOf(";base64"))
        switch (imageFormat) {
            case "png":
                b64d = item.base64Data.replace(/^data:image\/png;base64,/, "");
                break;
            case "jpg":
                b64d = item.base64Data.replace(/^data:image\/jpg;base64,/, "");
                break;
            case "jpeg":
                b64d = item.base64Data.replace(/^data:image\/jpeg;base64,/, "");
                break;
            case "webp":
                b64d = item.base64Data.replace(/^data:image\/webp;base64,/, "");
                break;
            default:
        }
        let uid = uuid();
        let temp = item.name.split('.');
        temp.splice(1, 0, uid.substring(0, 5));
        temp[0] = temp[0] + temp[1];
        temp.splice(1, 1);
        let finalName = temp.join('.');

        // this array will be stored in mongo
        images.push('./sportLocImgs/' + finalName);

        // write image to a file
        const dirname = './sportLocImgs';
        if (!fs.existsSync(dirname)) {
            fs.mkdirSync(dirname);
        }
        fs.writeFile(`./sportLocImgs/${finalName}`, b64d, 'base64', (err) => { })
    })

    // create sportOptions db ojects 
    let sportOpts = [];
    sportOptions.map((item) => {
        let so = new SportOption({
            serviceOption: item.serviceOption,
            availableHours: item.availableHours
        });
        sportOpts.push(so);
    });
    sportOpts.map(async (item) => await item.save())

    let finalImages = images.concat(oldImages);
    await SportLocation.findByIdAndUpdate(id, { title, sport, location, district, address, sportOpts, images: finalImages, inventory });
}


// Site.deleteMany({ userUID: uid, id: { $in: [10, 2, 3, 5]}}, function(err) {})

const deleteByIds = async (ids) => {
    await SportLocation.deleteMany({ _id: ids })
}
module.exports = {
    add,
    getAll,
    getById,
    getBySportType,
    updateById,
    deleteByIds,
}

