const cityService = require('./../services/cityService');
const { responseSuccess, responseWithError } = require('./../utils/response')

module.exports.getAll = async (req, res) => {
    try {
        let data = await cityService.getAll();
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}