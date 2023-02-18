const orderDetailService = require('./../services/orderDetailService')
const orderService = require('./../services/orderService')
const { responseSuccess, responseWithError } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

const checkMyCart = async (data) => {
    let [cart, order_detail] = await Promise.all([
        orderService.findOne({ userId: data.userId, status: data.status }),
        orderDetailService.findOne({ id: data.id })
    ])
    if (cart && cart.id === order_detail.orderId)
        return true;
    return false;
}

module.exports.updateQuantity = async (req, res) => {
    try {
        let data = { userId: req.user.id, status: 0, id: req.params.orderDetailId }
        let isMyOrder = await checkMyCart(data)
        if (isMyOrder) {
            await orderDetailService.updateByCondition({ quantity: req.body.quantity }, { id: req.params.orderDetailId })
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
        }
        else {
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.NOT_ALLOWED))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.removeProduct = async (req, res) => {
    try {
        if (req.params.orderDetailId == 0) // remove all products
        { 
            await orderDetailService.destroyByConditionOrder(req.user.id)
            res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY))
        }
        else {
            let data = { userId: req.user.id, status: 0, id: req.params.orderDetailId }
            let isMyOrder = await checkMyCart(data)
            if (isMyOrder) {
                await orderDetailService.destroyByCondition({ id: req.params.orderDetailId })
                res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY))
            }
            else {
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.NOT_ALLOWED))
            }
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}