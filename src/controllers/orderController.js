const orderService = require('../services/orderService')
const orderDetailService = require('../services/orderDetailService')
const storedProductService = require('./../services/storedProductService')
const { responseSuccess, responseWithError } = require('../utils/response')


module.exports.getProductsInCart = async (req, res, next) => {
    try {
        let data = await orderService.getProductsInCart({ userId: req.user.id, status: 0 })
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.addProductInCart = async (req, res, next) => {
    try {
        let condition = {
            userId: req.user.id,
            status: 0
        }
        let [cart, ] = await orderService.findOrCreate(condition, { userId: req.user.id })
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
        res.json(responseSuccess())

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.checkOut = async (req, res, next) => {
    try {
        let status = req.body.paymentMethod === 1 ? 1 : 2;
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
        res.json(responseSuccess(new_order_detail))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getMyOrderForClient = async (req, res, next) => {
    try {
        let data = await orderService.getAllWithOrderDetails({ userId: req.user.id, status: req.query.status })
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

const updateStatus = async (status, orderId) => {
    let order = await orderService.findOne({ id: orderId });
    let deliveryProgress = `${JSON.stringify({ status: ord.status, time: new Date() })};${order.deliveryProgress}`;
    return await Promise.all([
        orderService.updateByCondition({ status: status, deliveryProgress }, { id: orderId }),
        orderDetailService.updateByCondition({ status: status }, { orderId: orderId })
    ])
}

module.exports.updateStatusForClient = async (req, res, next) => {
    try {
        await updateStatus(req.body.status, parseInt(req.params.orderId));
        res.json(responseSuccess())
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.updateStatusForAdmin = async (req, res, next) => {
    try {
        if (req.body.status === 3) // phân đoạn kiểm tra hàng
        {
            let order = await orderService.findOne({ id: req.params.orderId });
            let deliveryProgress = `${JSON.stringify({ status: ord.status, time: new Date() })};${order.deliveryProgress}`;
            await Promise.all([
                orderService.updateByCondition({ status: req.body.status, deliveryProgress }, { id: req.params.orderId }),
                ...req.body.orderDetails.map(async (ele) => {  // k có dấu ... vẫn chạy bình thường, ảo vcl
                    await orderDetailService.updateByCondition(
                        { status: req.body.status, showRoomId: ele.showRoomId },
                        { id: ele.id }
                    )
                    let data = await storedProductService.findOne({ productId: ele.productId, showRoomId: ele.showRoomId })
                    await storedProductService.updateByCondition({ quantity: data.quantity - ele.quantity }, { id: data.id })
                })
            ])

        }
        else {
            await updateStatus(req.body.status, parseInt(req.params.orderId))
        }
        res.json(responseSuccess())
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getMyOrderForAdmin = async (req, res, next) => {
    try {
        let orders = await orderService.getByCondition({ status: parseInt(req.query.status) })
        orders = await Promise.all(
            orders.map(async (ele) => {
                let orderDetails = await orderDetailService.getMyOrder({ id: ele.id });
                return {
                    ...ele.dataValues, orderDetails
                }
            })
        )

        let m = new Map();
        for (let ele of orders) {
            let counter = m.get(ele.userId);

            let order = { ...ele };
            delete order.user;
            order.orderDetails = ele.orderDetails.map(order_detail => {
                let OrderDetail = { ...order_detail.dataValues }
                delete OrderDetail.order;
                OrderDetail.product = order_detail.dataValues.product.dataValues
                return OrderDetail;
            })
            order.deliveryProgress = JSON.parse(order.deliveryProgress)

            if (!counter) {
                m.set(ele.userId, [order])
            }
            else {
                counter.push(order);
                m.set(ele.userId, counter);
            }
        }
        let data = [];
        for (let [key, value] of m) {
            let user = orders.find(ele => ele.user.id === key);
            user = user.user.dataValues;
            user.orders = value;
            data.push(user)
        }
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}