const showRoomService = require('./../services/showRoomService')
const storedProductService = require('./../services/storedProductService');
const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess, responseWithError } = require('./../utils/response')
const { Op } = require('sequelize')
const mapService = require('./../services/mapService');

const getCoordinates = async (address) => {
    let coordinates = await mapService.getCoordinates(address);
    return JSON.stringify({
        lng: coordinates.features[0].center[0],
        lat: coordinates.features[0].center[1]
    })
}

const responseShowRoom = (showroom) => {
    showroom=showroom.dataValues;
    showroom.coordinates = JSON.parse(showroom.coordinates)
    return showroom;
}

module.exports.getAll = async (req, res, next) => {
    try {
        let data = {};
        if (req.query.name) {
            data.name = {
                [Op.like]: `%${req.query.name}%`
            }
        }
        let showRooms = await showRoomService.getByCondition(data);
        showRooms = showRooms.map(ele => responseShowRoom(ele))
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
        let result=responseShowRoom(showRooms[0])
        res.json(responseSuccess(result))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {

        req.body.coordinates = await getCoordinates(req.body.address)
        let showRooms = await showRoomService.create(req.body);
        res.json(responseSuccess(responseShowRoom(showRooms)));

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let data = await showRoomService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await showRoomService.getByCondition({ id: req.params.id });
            res.json(responseSuccess( responseShowRoom(response[0])));
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