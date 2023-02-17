const bannerService = require('./../services/bannerService')
const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess, responseWithError } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.getAll = async (req, res) => {
    try {
        const { limit, offset } = getPagination(parseInt(req.query.page_index), parseInt(req.query.page_size));
        let data = {
            limit,
            offset
        }
        let banners = await bannerService.getAllPaging(data);
        let response = getPagingData(banners, req.query.page_index, limit)
        res.status(200).json(responseSuccess(response))

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
        let banner = await bannerService.create(req.body);
        res.status(201).json(responseSuccess(banner));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.update = async (req, res) => {
    try {

        let data = await bannerService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await bannerService.getById(req.params.id);
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
        let data = await bannerService.destroyByCondition({ id: req.params.id });
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