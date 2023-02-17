const addressService = require('./../services/addressService');
const { responseSuccess, responseWithError } = require('./../utils/response');
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.getAll = async (req, res) => {
    try {
        let data = await addressService.getByCondition({ userId: req.user.id });
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err));
    }
}

module.exports.create = async (req, res) => {
    try {
        let body = {
            userId: req.user.id,
            ...req.body
        }
        let data = await addressService.create(body);
        res.status(201).json(responseSuccess(data));
    }
    catch (err) {
        res.status(500).json(responseWithError(err));
    }
}

module.exports.update = async (req, res) => {
    try {
        let body={
            name: req.body.name,
            phone: req.body.phone,
            typeAddress: req.body.typeAddress,
            detailAddress: req.body.detailAddress,
            street: req.body.street
        }
        let data = await addressService.updateByCondition(body, { id: req.params.id, userId: req.user.id });
        if (data[0] === 1) {
            let address = await addressService.getById(req.params.id);
            res.status(201).json(responseSuccess(address))
        }
        else {
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err));
    }
}

module.exports.destroy = async (req, res) => {
    try {
        let data = await addressService.destroyByCondition({ id: req.params.id, userId: req.user.id });
        if (data === 1) {
            res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));
        }
        else {
            res.status(404).json(responseWithError(CONSTANT_MESSAGES.DELETE_FAILED))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err));
    }
}