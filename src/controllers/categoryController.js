const categoryService = require('./../services/categoryService')
const { responseSuccess, responseWithError } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.getAll = async (req, res) => {
    try {
        let categories = await categoryService.getByCondition({ parentId: null });
        // let categories = await categoryService.query(`
        // WITH RECURSIVE category_recursive AS (
        //     SELECT id, name, parentId, CAST(id AS VARCHAR(255)) AS path
        //     FROM categories
        //     where parentId is null
        //     UNION ALL
        //     SELECT categories.id, categories.name, categories.parentId, CONCAT(category_recursive.path, '/', categories.id)
        //     FROM category_recursive
        //     JOIN categories ON categories.parentId = category_recursive.id
        //   )
        //   SELECT id, name, parentId, path
        //   FROM category_recursive order by path
        //   `)
        res.status(200).json(responseSuccess(categories));
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
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
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
