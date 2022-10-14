const express = require('express')

const router = express.Router()

const propertyValueRouter=require('./property_value')
const propertyRouter=require('./property')
const usersRouter = require('./user');
const addressRouter = require('./address');
const productsRouter = require('./product');
const ordersRouter = require('./order');

const categoryRouter = require('./category');
const brandRouter = require('./brand');
const cityRouter = require('./city');
const districtRouter = require('./district');
const wardRouter = require('./ward');
const onePayRouter = require('./onepay');
const cartRouter = require("./cart");
const uploadRouter=require('./upload');
const showRoomRouter=require('./show_room');
const assessRouter=require('./assess');
const markRouter = require('./mark');
const bannerRouter=require('./banner');

// infomation
router.use('/user', usersRouter);

// address
router.use('/district', districtRouter);
router.use('/ward', wardRouter);
router.use('/city', cityRouter);
router.use('/address', addressRouter);

// product
router.use('/product', productsRouter);
router.use('/category', categoryRouter);
router.use('/brand', brandRouter);
router.use('/property-value', propertyValueRouter);
router.use('/property', propertyRouter);
router.use('/show-room', showRoomRouter);
router.use('/mark', markRouter);
router.use('/banner', bannerRouter);

// order
router.use('/order', ordersRouter);
router.use('/cart', cartRouter);
router.use('/onepay',onePayRouter);
router.use('/assess', assessRouter)


// upload
router.use('/upload', uploadRouter);



module.exports = router
