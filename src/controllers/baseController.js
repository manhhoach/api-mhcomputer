const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');
const tryCatch = require('./../utils/tryCatch');
const AppError = require('./../utils/AppError');
const baseService = require('./../services/baseService')


module.exports.getAllPaging = (model) => tryCatch(async (req, res, next) => {
    const page_index = parseInt(req.query.page_index), page_size = parseInt(req.query.page_size);
    const { limit, offset } = getPagination(page_index, page_size);
    let order = [['createdDate', 'DESC']], where = {};
    if (req.query.sort) {
        if (req.query.sort.startsWith('-')) {
            let columnName = req.query.sort.split('-')[1];
            order = [[columnName, 'DESC']]
        }
        else {
            order = [[req.query.sort, 'ASC']]
        }
    }
    let data = await baseService.getAllPaging(model, where, limit, offset, order);
    let response = getPagingData(data,page_index, limit);
    res.status(200).json(responseSuccess(response));
})

module.exports.getById = (model) => tryCatch(async (req, res, next) => {
    let data = await baseService.getById(model, req.params.id);
    res.status(200).json(responseSuccess(data));
})

module.exports.getAll = (model) => tryCatch(async (req, res, next) => {
    let data = await baseService.getAll(model);
    res.status(200).json(responseSuccess(data));
})

module.exports.create = (model) => tryCatch(async (req, res, next) => {
    let data = await baseService.create(model, req.body);
    res.status(201).json(responseSuccess(data));
})

module.exports.update = (model) => tryCatch(async (req, res, next) => {
    let data = await baseService.updateByCondition(model, req.body, { id: req.params.id });
    if (data[0] === 1) {
        let response = await baseService.getById(model, req.params.id);
        res.status(201).json(responseSuccess(response));
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.UPDATE_FAILED));
    }
})

module.exports.destroy = (model) => tryCatch(async (req, res, next) => {
    let data = await baseService.destroyByCondition(model, { id: req.params.id });
    if (data === 1) {
        res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
    }
    else {
        next(new AppError(404, CONSTANT_MESSAGES.DELETE_FAILED));
    }
})


