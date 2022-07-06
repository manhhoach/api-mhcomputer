const brandService = require('./../services/brandService')
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
        let brands = await brandService.getByCondition(data);
        let response = getPagingData(brands, parseInt(req.query.page_index), limit);
        res.json(responseSuccess(response))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        let data = { condition: { id: req.params.id } }
        let brands = await brandService.getByCondition(data);
        res.json(responseSuccess(brands.rows[0].dataValues))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {
        let brands = await brandService.create(req.body);
        res.json(responseSuccess(brands));
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let data = await brandService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await brandService.getByCondition({ condition: { id: req.params.id } });
            res.json(responseSuccess(response.rows[0].dataValues));
        }
        else {
            res.json(responseWithError("BRAND UPDATE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res, next) => {
    try {

        let data = await brandService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.json(responseSuccess("BRAND DELETE SUCCESSFUL"));
        }
        else {
            res.json(responseWithError("BRAND DELETE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}