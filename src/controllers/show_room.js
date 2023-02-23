const showRoomService = require('../services/show_room')
const storedProductService = require('../services/stored_product');
const { responseSuccess } = require('../utils/response')
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const baseController = require('./baseController');
const { show_rooms } = require('../database/db')
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

module.exports.getAll = baseController.getAll(show_rooms)

module.exports.getAllPaging = baseController.getAllPaging(show_rooms)

module.exports.create = baseController.create(show_rooms)

module.exports.update = baseController.update(show_rooms)

module.exports.destroy = tryCatch(async (req, res, next) => {

    await storedProductService.destroyByCondition({ showRoomId: req.params.id })
    let data = await showRoomService.destroyByCondition({ id: req.params.id });
    if (data === 1) {
        res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.DELETE_FAILED))
    }

})

module.exports.getProductInShowRoom = tryCatch(async (req, res, next) => {

    let condition = {
        showRoomId: req.params.id
    }
    if (req.query.productId)
        condition.productId = req.query.productId
    let products = await storedProductService.getAllInShowRoom(condition);
    res.status(200).json(responseSuccess(products))


})

module.exports.updateQuantityInShowRoom = tryCatch(async (req, res, next) => {

    await storedProductService.updateByCondition(
        { quantity: req.body.quantity },
        { showRoomId: req.params.id, productId: req.body.productId }
    )
    res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))


})

module.exports.addProductInShowRoom = tryCatch(async (req, res, next) => {

    let [stored, isCreated] = await storedProductService.findOrCreate(
        { showRoomId: req.params.id, productId: req.body.productId },
        { ...req.body, showRoomId: req.params.id }
    )
    if (!isCreated) {
        await storedProductService.increment(
            { quantity: req.body.quantity },
            { id: stored.id }
        )
        stored = await storedProductService.findOne({ id: stored.id })
    }
    res.status(201).json(responseSuccess(stored))
})