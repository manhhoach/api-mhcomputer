const orderService = require('../services/order')
const orderDetailService = require('../services/order_detail')
const storedProductService = require('../services/stored_product')
const { responseSuccess } = require('../utils/response')
const { ORDER_STATUS } = require('../utils/constants/orderStatus')
const { sequelize } = require('../database/db')
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

module.exports.getProductsInCart = tryCatch(async (req, res, next) => {

    let data = await orderService.getProductsInCart(
        { userId: req.user.id, status: ORDER_STATUS[0].status },
        ['id'],
        ['id', 'quantity', 'createdDate'],
        ['id', 'name', 'price', 'imageCover']
    )
    res.status(200).json(responseSuccess(data))

})

module.exports.addProductInCart = tryCatch(async (req, res, next) => {

    let condition = {
        userId: req.user.id,
        status: ORDER_STATUS[0].status
    }
    let [cart,] = await orderService.findOrCreate(condition, { userId: req.user.id })
    let orderProduct = await orderDetailService.findOne({
        orderId: cart.id,
        productId: req.body.productId
    });
    if (orderProduct) {
        await orderDetailService.updateByCondition(
            { quantity: req.body.quantity + orderProduct.quantity },
            { id: orderProduct.id }
        )
    }
    else {
        await orderDetailService.create({
            orderId: cart.id,
            productId: req.body.productId,
            quantity: req.body.quantity
        })
    }
    res.status(201).json(responseSuccess(CONSTANT_MESSAGES.CREATE_SUCCESSFULLY))

})

module.exports.checkOut = tryCatch(async (req, res, next) => {

    //let status = req.body.paymentMethod === 1 ? ORDER_STATUS[1].status : ORDER_STATUS[2].status;
    let status = req.body.status;
    let new_order = await orderService.create({
        userId: req.user.id,
        phone: req.body.phone,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        price: req.body.price,
        discount: req.body.discount,
        status: status
    });
    let new_order_detail = await Promise.all(
        req.body.products.map(async (ele) => {
            let order_detail = await orderDetailService.create({
                orderId: new_order.id,
                productId: ele.productId,
                quantity: ele.quantity,
                status: status
            })
            if (ele.orderDetailId)
                await orderDetailService.destroyByCondition({ id: ele.orderDetailId })

            return order_detail
        })
    );
    res.status(201).json(responseSuccess(new_order_detail))

})

module.exports.getOrdersByStatus = tryCatch(async (req, res, next) => {
    
    let condition = req.user.status === 0 ? { userId: req.user.id, status: req.query.status } : { status: req.query.status }
    let data = await orderService.getAllWithOrderDetails(condition, 
        ['id', 'phone', 'code', 'address', 'price', 'discount', 'createdDate', 'paymentMethod', 'deliveryProgress'],
        ['id', 'quantity', 'createdDate'],
        ['id', 'name', 'price', 'imageCover'],
        ['id', 'name']
    );
    res.status(200).json(responseSuccess(data))

})

const updateStatus = (status, order) => {
    let dP = order.deliveryProgress;
    dP.push({ status: status, time: new Date() })
    dP = JSON.stringify(dP);
    return Promise.all([
        orderService.updateByCondition({ status: status, deliveryProgress: dP }, { id: order.id }),
        orderDetailService.updateByCondition({ status: status }, { orderId: order.id })
    ])
}

module.exports.updateStatusOrder = tryCatch(async (req, res, next) => {
    const t = await sequelize.transaction()
    if (req.user.status >= ORDER_STATUS[req.body.status].permissionStatus) {
        if (req.user.status === 0 || req.body.status !== 3) {
            let order = await orderService.findOne({ id: req.params.id, userId: req.user.id })
            if (order) {
                await updateStatus(req.body.status, { id: order.id, deliveryProgress: order.deliveryProgress })
                res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY));
            }
            else {
                next(new AppError(404, CONSTANT_MESSAGES.ORDER_NOT_FOUND))
            }
        }
        else {
            let order = await orderService.findOne({ id: req.params.id })
            let dP = order.deliveryProgress;
            dP.push({ status: req.body.status, time: new Date() })
            dP = JSON.stringify(dP);

            await Promise.all([
                orderService.updateByCondition({ status: req.body.status, deliveryProgress: dP }, { id: order.id }, t),
                ...req.body.orderDetails.map(async (ele) => {
                    await orderDetailService.updateByCondition({ status: req.body.status, showRoomId: ele.showRoomId }, { orderId: order.id }, t);
                    let data = await storedProductService.findOne({ productId: ele.productId, showRoomId: ele.showRoomId });
                    await storedProductService.updateByCondition({ quantity: data.quantity - ele.quantity }, { id: data.id }, t);
                })
            ])
            await t.commit()
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY));
        }
    }
    else {
        next(new AppError(400, CONSTANT_MESSAGES.NOT_ALLOWED))
    }

})

