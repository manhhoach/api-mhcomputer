const showRoomService = require('./../services/showRoomService')
const storedProductService = require('./../services/storedProductService');
const { responseSuccess, responseWithError } = require('./../utils/response')
const { Op } = require('sequelize')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.getAll = async (req, res) => {
    try {
        let data = req.query.name ? { name: { [Op.like]: `%${req.query.name}%` } } : {};
        let showRooms = await showRoomService.getByCondition(data);
        res.status(200).json(responseSuccess(showRooms))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
        let showRoom = await showRoomService.create(req.body);
        res.status(201).json(responseSuccess(showRoom));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.update = async (req, res) => {
    try {
        let data = await showRoomService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await showRoomService.getById(req.params.id);
            res.status(201).json(responseSuccess(response));
        }
        else {
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res) => {
    try {
        await storedProductService.destroyByCondition({ showRoomId: req.params.id })
        let data = await showRoomService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
        }
        else {
            res.status(404).json(responseWithError(CONSTANT_MESSAGES.DELETE_FAILED))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.getProductInShowRoom = async (req, res) => {
    try {
        let condition = {
            showRoomId: req.params.id
        }
        if (req.query.productId)
            condition.productId = req.query.productId
        let products = await storedProductService.getAllInShowRoom(condition);
        res.status(200).json(responseSuccess(products))

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.updateQuantityInShowRoom = async (req, res) => {
    try {
        await storedProductService.updateByCondition(
            { quantity: req.body.quantity },
            { showRoomId: req.params.id, productId: req.body.productId }
        )
        res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.addProductInShowRoom = async (req, res) => {
    try {
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

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}