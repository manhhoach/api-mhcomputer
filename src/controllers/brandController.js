const brandService = require('./../services/brandService')
const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess, responseWithError } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');

module.exports.getAll = tryCatch(async (req, res, next) => {

    const { limit, offset } = getPagination(parseInt(req.query.page_index), parseInt(req.query.page_size));
    let brands = await brandService.getByCondition({}, limit, offset);
    let response = getPagingData(brands, parseInt(req.query.page_index), limit);
    res.status(200).json(responseSuccess(response))

})

module.exports.getById = tryCatch(async (req, res, next) => {

    let brand = await brandService.getById(req.params.id);
    res.status(200).json(responseSuccess(brand))

})

module.exports.create = tryCatch(async (req, res, next) => {

    let brand = await brandService.create(req.body);
    res.status(201).json(responseSuccess(brand));

})

module.exports.update = tryCatch(async (req, res, next) => {

    let data = await brandService.updateByCondition(req.body, { id: req.params.id });
    if (data[0] === 1) {
        let response = await brandService.getById(req.params.id);
        res.status(201).json(responseSuccess(response));
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
    }

})

module.exports.destroy = tryCatch(async (req, res, next) => {

    let data = await brandService.destroyByCondition({ id: req.params.id });
    if (data === 1) {
        res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.DELETE_FAILED));
    }


})