const categoryService = require('../services/category')
const { responseSuccess } = require('../utils/response')
const { categories } = require('../database/db')
const baseController = require('./baseController');
const tryCatch = require('../utils/tryCatch');


module.exports.getAll = tryCatch(async (req, res, next) => {
    let categories = await categoryService.getByCondition({ parentId: null });
    res.status(200).json(responseSuccess(categories));

})

module.exports.create = baseController.create(categories)

module.exports.update = baseController.update(categories)

module.exports.destroy = baseController.destroy(categories)
