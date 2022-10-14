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
        let data = { userId: req.user.id, status: 0, id: req.params.id }
        let isMyOrder = await checkMyCart(data)
        if (isMyOrder) {
            await orderDetailService.updateByCondition({ quantity: req.body.quantity }, { id: req.params.id })
            res.json(responseSuccess("UPDATE QUANTITY SUCCESSFUL"))
        }
        else {
            res.json(responseWithError("YOU CAN NOT UPDATE"))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.destroy = async (req, res, next) => {
    try {
        if (req.params.id == 0) // xoá tất cả
        {
            let myCart = await orderService.findOne({ userId: req.user.id, status: 0 })
            if (myCart) {
                let data = await orderDetailService.destroyByCondition({ orderId: myCart.id })
                if (data !== 0)
                    res.json(responseSuccess("DELETE ALL PRODUCT SUCCESSFUL"))
                else
                    res.json(responseWithError("CAN NOT DELETE"))
            }
            else {
                res.json(responseWithError("CAN NOT DELETE"))
            }

        }
        else {
            let data = { userId: req.user.id, status: 0, id: req.params.id }
            let isMyOrder = await checkMyCart(data)
            if (isMyOrder) {
                await orderDetailService.destroyByCondition({ id: req.params.id })
                res.json(responseSuccess("DELETE PRODUCT SUCCESSFUL"))
            }
            else {
                res.json(responseWithError("CAN NOT DELETE"))
            }
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}