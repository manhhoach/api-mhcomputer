const assessService = require('../services/assess');
const { responseSuccess } = require('../utils/response')
const { getPagingData, getPagination } = require('../utils/pagination');
const tryCatch = require('../utils/tryCatch');
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const baseController = require('./baseController');
const { models } = require('../database/db')

module.exports.getMyAssesses = tryCatch(async (req, res, next) => {
    const page_index = req.query.page_index, page_size = req.query.page_size;
    const { limit, offset } = getPagination(page_index, page_size);
    let data = await assessService.getByCondition({
        userId: req.user.id
    }, limit, offset, [], ['id', 'name', 'imageCover'])
    let response = getPagingData(data, page_index, limit)
    res.status(200).json(responseSuccess(response))

})

module.exports.create = tryCatch(async (req, res, next) => {

    // let checkOrderDetail = await orderDetailService.checkOrder({
    //     order_detail: { status: ORDER_STATUS[5].status, id: req.params.orderDetailId },
    //     order: { userId: req.user.id }
    // })
    // if (checkOrderDetail) {
    //     let [, , comment] = await Promise.all([
    //         orderDetailService.updateByCondition({ status: ORDER_STATUS[7].status }, { id: req.params.orderDetailId }),
    //         orderService.updateByCondition({ status: ORDER_STATUS[7].status }, { id: checkOrderDetail.orderId }),
    //         assessService.create({
    //             productId: req.body.productId,
    //             userId: req.user.id,
    //             content: req.body.content,
    //             rate: req.body.rate,
    //             imageUrl: req.body.imageUrl,
    //             status: req.body.status
    //         })
    //     ]);
        let comment=await assessService.create({
            userId: req.user.id,
            ...req.body
        })
        res.status(201).json(responseSuccess(comment))
    // }
    // else {
    //     next(new AppError(404, CONSTANT_MESSAGES.ORDER_NOT_FOUND))
    // }

})

module.exports.getAssessOfProduct = tryCatch(async (req, res, next) => {

    const page_index = parseInt(req.query.page_index), page_size = parseInt(req.query.page_size);
    const { limit, offset } = getPagination(page_index, page_size);
    let data = await assessService.getByCondition({
        productId: req.params.id
    }, limit, offset, ['id', 'fullName'])

    let response = getPagingData(data, page_index, limit)
    res.status(200).json(responseSuccess(response))

})


module.exports.update = tryCatch(async (req, res, next) => {
    let data = await assessService.updateByCondition({ response: req.body.response }, { id: req.params.id })
    if (data[0] === 1)
        res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
    else
        res.status(400).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_FAILED))

})


module.exports.destroy = baseController.destroy(models.assesses)


module.exports.statistical = tryCatch(async (req, res, next) => {
    let data = await assessService.statistical({ productId: req.params.productId })
    res.status(200).json(responseSuccess(data))
})