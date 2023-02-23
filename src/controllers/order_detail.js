const orderDetailService = require('../services/order_detail')
const orderService = require('../services/order')
const { responseSuccess } = require('../utils/response')
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

const checkMyCart = async (data) => {
    let [cart, order_detail] = await Promise.all([
        orderService.findOne({ userId: data.userId, status: data.status }),
        orderDetailService.findOne({ id: data.id })
    ])
    if (cart && cart.id === order_detail.orderId)
        return true;
    return false;
}

module.exports.updateQuantity = tryCatch(async (req, res, next) => {

    let data = { userId: req.user.id, status: 0, id: req.params.orderDetailId }
    let isMyOrder = await checkMyCart(data)
    if (isMyOrder) {
        await orderDetailService.updateByCondition({ quantity: req.body.quantity }, { id: req.params.orderDetailId })
        res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.NOT_ALLOWED))
    }
})

module.exports.removeProduct = tryCatch(async (req, res, next) => {

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
            next(new AppError(400, CONSTANT_MESSAGES.NOT_ALLOWED))
        }
    }

})