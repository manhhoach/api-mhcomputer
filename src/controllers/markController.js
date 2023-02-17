const markService = require('./../services/markService');
const { responseSuccess, responseWithError } = require('./../utils/response');
const { getPagingData, getPagination } = require('./../utils/pagination');
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.getAll = async (req, res) => {
    try {
        let page_index = parseInt(req.query.page_index), page_size = parseInt(req.query.page_size);
        const { limit, offset } = getPagination(page_index, page_size);
        let data = await markService.getByCondition({ userId: req.user.id, status: req.query.status }, limit, offset);
        let response = getPagingData(data, page_index, limit)
        res.status(200).json(responseSuccess(response))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
        let body = {
            userId: req.user.id,
            productId: req.body.productId,
            status: req.body.status ? 0 : 1 // 0: like, 1: buy later
        }
        let data = await markService.create(body);
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let data = await markService.destroyByCondition({ id: req.params.id, userId: req.user.id });
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