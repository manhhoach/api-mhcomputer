const bannerService = require('./../services/bannerService')
const { getPagingData, getPagination } = require('./../utils/pagination');
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAll = async (req, res, next) => {
    try {
        const { limit, offset } = getPagination(parseInt(req.query.page_index), parseInt(req.query.page_size));
        let data = {
            condition: {},
            limit,
            offset
        }
        let banners = await bannerService.getByCondition(data);
        res.json(responseSuccess(banners.rows))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {
        let banner = await bannerService.create(req.body);
        res.json(responseSuccess(banner));
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let data = await bannerService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await bannerService.getByCondition({ condition: { id: req.params.id } });
            res.json(responseSuccess(response.rows[0].dataValues));
        }
        else {
            res.json(responseWithError("BANNER UPDATE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res, next) => {
    try {
        let data = await bannerService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.json(responseSuccess("BANNER DELETE SUCCESSFUL"));
        }
        else {
            res.json(responseWithError("BANNER DELETE FAILED"))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}