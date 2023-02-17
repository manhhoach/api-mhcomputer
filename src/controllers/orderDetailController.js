const orderDetailService = require('./../services/orderDetailService')
const orderService = require('./../services/orderService')
const { responseSuccess, responseWithError } = require('./../utils/response')

const checkMyCart = async (data) => {
    let [cart, order_detail] = await Promise.all([
        orderService.findOne({ userId: data.userId, status: data.status }),
        orderDetailService.findOne({ id: data.id })
    ])
    if (cart && cart.id === order_detail.orderId)
        return true;
    return false;
}

module.exports.updateQuantity = async (req, res, next) => {
    try {
        let data = { userId: req.user.id, status: 0, id: req.params.orderDetailId }
        let isMyOrder = await checkMyCart(data)
        if (isMyOrder) {
            await orderDetailService.updateByCondition({ quantity: req.body.quantity }, { id: req.params.orderDetailId })
            res.json(responseSuccess("UPDATE QUANTITY SUCCESSFUL"))
        }
        else {
            res.json(responseWithError("YOU CAN NOT UPDATE"))
        }
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.removeProduct = async (req, res, next) => {
    try {
        if (req.params.orderDetailId == 0) // remove all products
        { 
            await orderDetailService.destroyByConditionOrder(req.user.id)
            res.json(responseSuccess("REMOVE ALL PRODUCT SUCCESSFUL"))
        }
        else {
            let data = { userId: req.user.id, status: 0, id: req.params.orderDetailId }
            let isMyOrder = await checkMyCart(data)
            if (isMyOrder) {
                await orderDetailService.destroyByCondition({ id: req.params.orderDetailId })
                res.json(responseSuccess("REMOVE PRODUCT SUCCESSFUL"))
            }
            else {
                res.json(responseWithError("YOU CAN NOT REMOVE"))
            }
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}