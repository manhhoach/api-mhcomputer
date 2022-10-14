const showRoomService = require('./../services/showRoomService')
const storedProductService = require('./../services/storedProductService');
const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess, responseWithError } = require('./../utils/response')
const { Op } = require('sequelize')



module.exports.getAll = async (req, res, next) => {
    try {
        let data = {};
        if (req.query.name) {
            data.name = {
                [Op.like]: `%${req.query.name}%`
            }
        }
        let showRooms = await showRoomService.getByCondition(data);
        res.json(responseSuccess(showRooms))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        let data = { condition: { id: req.params.id } }
        let showRooms = await showRoomService.getByCondition(data);
        res.json(responseSuccess(showRooms[0]))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {

        let showRooms = await showRoomService.create(req.body);
        res.json(responseSuccess(showRooms));

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let data = await showRoomService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await showRoomService.findOne({ id: req.params.id });
            res.json(responseSuccess(response));
        }
        else {
            res.json(responseWithError("SHOW ROOM UPDATE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res, next) => {
    try {

        await storedProductService.destroyByCondition({ showRoomId: req.params.id })
        let data = await showRoomService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.json(responseSuccess("SHOW ROOM DELETE SUCCESSFUL"));
        }
        else {
            res.json(responseWithError("SHOW ROOM DELETE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getProductInShowRoom = async (req, res, next) => {
    try {

        let products = await storedProductService.getAllInShowRoom({ showRoomId: req.params.id });
        products = products.map(ele => {
            let product = ele.product.dataValues;
            return {
                ...ele.dataValues,
                product
            }
        })
        res.json(responseSuccess(products))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.updateQuantityInShowRoom = async (req, res, next) => {
    try {

        await storedProductService.updateByCondition(
            { quantity: req.body.quantity },
            { showRoomId: req.params.id, productId: req.body.productId }
        )
        res.json(responseSuccess())

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.addProductInShowRoom = async (req, res, next) => {
    try {

        let data = await storedProductService.findOne(
            { showRoomId: req.params.id, productId: req.body.productId }
        )
        if (data) {
            await storedProductService.updateByCondition(
                { quantity: req.body.quantity + data.quantity },
                { id: data.id }
            )
        }
        else {
            await storedProductService.create({
                ...req.body, showRoomId: req.params.id
            })
        }
        res.json(responseSuccess())

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}