const propertyValueService = require('./../services/propertyValueService')
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAll = async (req, res) => {
    try {


    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
        let data = req.body.propertyId.map(ele => {
            return { propertyId: ele, categoryId: req.body.categoryId };
        })
        data = await propertyValueService.bulkCreate(data);
        res.status(200).json(responseSuccess(data));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}