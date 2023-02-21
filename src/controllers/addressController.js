const addressService = require('./../services/addressService');
const { responseSuccess, responseWithError } = require('./../utils/response');
const CONSTANT_MESSAGES = require('./../utils/constants/messages');
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');

module.exports.getAll = tryCatch(async (req, res, next) => {
    
    let data = await addressService.getByCondition({ userId: req.user.id });
    res.status(200).json(responseSuccess(data))
})

module.exports.create = tryCatch(async (req, res, next) => {
    let body = {
        userId: req.user.id,
        ...req.body
    }
    let data = await addressService.create(body);
    res.status(201).json(responseSuccess(data));
})

module.exports.update = tryCatch(async (req, res, next) => {

    let body = {
        name: req.body.name,
        phone: req.body.phone,
        typeAddress: req.body.typeAddress,
        detailAddress: req.body.detailAddress,
        street: req.body.street
    }
    let data = await addressService.updateByCondition(body, { id: req.params.id, userId: req.user.id });
    if (data[0] === 1) {
        let address = await addressService.getById(req.params.id);
        res.status(201).json(responseSuccess(address))
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
    }

})

module.exports.destroy = tryCatch(async (req, res, next) => {

    let data = await addressService.destroyByCondition({ id: req.params.id, userId: req.user.id });
    if (data === 1) {
        res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.DELETE_FAILED));
    }

})