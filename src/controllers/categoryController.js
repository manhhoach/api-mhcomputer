const categoryService = require('./../services/categoryService')
const { responseSuccess, responseWithError } = require('./../utils/response')
const pagination = require('./../utils/pagination')

module.exports.getAll = async (req, res, next) => {
    try {

        let category_node = await categoryService.getByCondition({ parentId: 0 });
        let data= await Promise.all(
            category_node.map(async (category) => {
               let category_child= await categoryService.getByCondition({ parentId: category.id });
               return {
                ...category.dataValues,
                category_child
               }
            })
        );

        res.json(responseSuccess(data));
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {

        let data = await categoryService.create(req.body);
        res.json(responseSuccess(data.dataValues));

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let data = await categoryService.updateByCondition(req.body, { id: req.params.id });
        if (data[0] === 1) {
            let response = await categoryService.getByCondition({ id: req.params.id });
            res.json(responseSuccess(response[0].dataValues));
        }
        else {
            res.json(responseWithError("CATEGORY UPDATE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res, next) => {
    try {

        let data = await categoryService.destroyByCondition({ id: req.params.id });
        if (data === 1) {
            res.json(responseSuccess("CATEGORY DELETE SUCCESSFUL"));
        }
        else {
            res.json(responseWithError("CATEGORY DELETE FAILED"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        let data = { id: req.params.id }
        let category = await categoryService.getByCondition(data);
        res.json(responseSuccess(category[0].dataValues))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}