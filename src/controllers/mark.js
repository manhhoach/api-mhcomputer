const markService = require('../services/mark');
const { responseSuccess } = require('../utils/response');
const { getPagingData, getPagination } = require('../utils/pagination');
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

module.exports.getAll = tryCatch(async (req, res, next) => {

    let page_index = parseInt(req.query.page_index), page_size = parseInt(req.query.page_size);
    const { limit, offset } = getPagination(page_index, page_size);
    let data = await markService.getByCondition({ userId: req.user.id, status: req.query.status }, limit, offset);
    let response = getPagingData(data, page_index, limit)
    res.status(200).json(responseSuccess(response))

})

module.exports.create = tryCatch(async (req, res, next) => {

    let body = {
        userId: req.user.id,
        productId: req.body.productId,
        status: req.body.status ? 0 : 1 // 0: like, 1: buy later
    }
    let data = await markService.create(body);
    res.status(200).json(responseSuccess(data))

})

module.exports.destroy = tryCatch(async (req, res, next) => {

    let data = await markService.destroyByCondition({ id: req.params.id, userId: req.user.id });
    if (data === 1) {
        res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.DELETE_FAILED))
    }

})