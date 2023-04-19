const categoryService = require('../services/category')
const { responseSuccess } = require('../utils/response')
const { models } = require('../database/db')
const baseController = require('./baseController');
const tryCatch = require('../utils/tryCatch');


module.exports.getAll = tryCatch(async (req, res, next) => {
    let categories = await categoryService.getByCondition({ parentId: null });

    // let stringQuery =`WITH RECURSIVE tree_category AS (
    //     SELECT id, name, parentId 
    //     FROM categories 
    //     WHERE parentId IS NULL 
    //     UNION ALL
    //     SELECT c.id, c.name, c.parentId 
    //     FROM categories c 
    //     INNER JOIN tree_category tc ON c.parentId = tc.id
    //   )
      
    //   SELECT * 
    //   FROM tree_category;`
    // let categories=await categoryService.query(stringQuery);


    res.status(200).json(responseSuccess(models.categories));

})

module.exports.create = baseController.create(models.categories)

module.exports.update = baseController.update(models.categories)

module.exports.destroy = baseController.destroy(models.categories)
