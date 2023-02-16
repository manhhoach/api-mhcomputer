const categoryService = require('./../services/categoryService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAll = async (req, res) => {
    try {
        let categories = await categoryService.getByCondition({ parentId: null });
        res.json(responseSuccess(categories));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
        let data = await categoryService.create(req.body);
        res.status(201).json(responseSuccess(data));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.update = async (req, res) => {
    try {
        let data = await categoryService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await categoryService.getById(req.params.id);
            res.status(201).json(responseSuccess(response));
        }
        else {
            res.status(400).json(responseWithError("UPDATE FAILED"))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let data = await categoryService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.status(200).json(responseSuccess("DELETE SUCCESSFULLY"));
        }
        else {
            res.status(404).json(responseWithError("DELETE FAILED"))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}
