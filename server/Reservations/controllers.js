const express = require('express');

const ReservationsService = require('./services');

const router = express.Router();


// add a reservation 
// private route
router.post('/', async (req, res, next) => {
    const {
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
    } = req.body;
    console.log('wtf ', userId,
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
    try {
        await ReservationsService.add(userId, title, sport, location, selectedServiceOption, selectedHour, image, price, date, available, canceled);

        res.status(201).end();
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const products = await ProductsService.getAll();
        res.json(products);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;
    try {
        const product = await ProductsService.getById(id);
        res.json(product);
    } catch (err) {
        console.error(err.message);
    }
});

router.get('/category/:category', async (req, res, next) => {
    const {
        category
    } = req.params;
    try {
        let products;
        if (category === 'toate') {
            products = await ProductsService.getAll();
        } else {
            products = await ProductsService.getByCategory(category);
        }

        res.json(products);
    } catch (err) {
        console.error(err.message);
    }
})

router.get('/brandList/:category', async (req, res, next) => {
    const {
        category
    } = req.params;
    console.log('route called');
    console.log(' categ ', category);
    try {
        let brandsList = [];
        switch (category) {
            case 'laptop': brandsList = ['Acer', 'Apple', 'Asus', 'Dell']; break;
            case 'smartphone': brandsList = ['Apple', 'Huawei', 'Samsung', 'Xiaomi']; break;
            case 'smartwatch': brandsList = ['Apple', 'Cronos', 'Fitbit', 'Huawei']; break;
            case 'tableta': brandsList = ['Apple', 'Huawei', 'Lenovo', 'Samsung']; break;
            case 'televizor': brandsList = ['LG', 'Philips', 'Samsung', 'Sony']; break;
            case 'toate': brandsList = ['Acer', 'Apple', 'Asus', 'Dell', 'Huawei', 'Samsung', 'Xiaomi', 'Cronos', 'Fitbit', 'Lenovo', 'LG', 'Philips', 'Sony']
            default:
        }
        res.json(brandsList);
    } catch (err) {
        console.error(err.message);
    }
})



router.put('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        await ProductsService.updateById(id, req.body);
        res.status(204).end();
    } catch (err) {
        console.error(err);
    }

})

router.delete('/:id', async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        await ProductsService.deleteById(id);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
    }
})



module.exports = router;