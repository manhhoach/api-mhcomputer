const assessService = require('./../services/assessService');
const orderDetailService = require('./../services/orderDetailService')
const orderService = require('./../services/orderService')
const { Op } = require('sequelize')
const { responseSuccess, responseWithError } = require('./../utils/response')
const { getPagingData, getPagination } = require('./../utils/pagination');

module.exports.getMyAssesses = async (req, res, next) => {
    try {
        const page_index = req.query.page_index, page_size = req.query.page_size;
        const { limit, offset } = getPagination(page_index, page_size);
        let data = await assessService.getByCondition({
            assess: { userId: req.user.id }
        }, limit, offset)

        data = data.map(ele => {
            ele = ele.dataValues;
            ele.product = ele.product.dataValues;
            delete ele.user;
            return ele;
        })
        let response = getPagingData({ rows: data, count: data.length }, page_index, limit)
        res.json(responseSuccess(response))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {
        let checkOrderDetail = await orderDetailService.checkOrder({
            order_detail: { status: 5, id: req.body.orderDetailId },
            order: { userId: req.user.id }
        })
        if (checkOrderDetail) {
            let [, , comment] = await Promise.all([
                orderDetailService.updateByCondition({ status: 7 }, { id: req.body.orderDetailId }),
                orderService.updateByCondition({ status: 7 }, { id: checkOrderDetail.orderId }),
                assessService.create({
                    productId: req.body.productId,
                    userId: req.user.id,
                    content: req.body.content,
                    rate: req.body.rate,
                    imageUrl: req.body.imageUrl,
                    status: req.body.status
                })
            ]);
            res.json(responseSuccess("ASSESS PRODUCT SUCCESSFUL"))
        }
        else {
            res.json(responseWithError("ORDER DETAIL NOT FOUND"));
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getAssessOfProduct = async (req, res, next) => {
    try {
        const page_index = req.query.page_index, page_size = req.query.page_size;
        const { limit, offset } = getPagination(page_index, page_size);
        let data = await assessService.getByCondition({
            assess: { productId: req.params.id }
        }, limit, offset)
        
        data = data.map(ele => {
            ele = ele.dataValues;
            ele.user=ele.user.dataValues;
            delete ele.product;
            return ele;
        })
        let response = getPagingData({ rows: data, count: data.length }, page_index, limit)
        res.json(responseSuccess(response))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {
        let data={response: req.body.response};
        data= await assessService.updateByCondition(data, {id: req.params.id})
        if(data[0]===1)
            res.json(responseSuccess("RESPONSE ASSESS SUCCESSFUL"))
        else
            res.json(responseWithError("RESPONSE ASSESS FAILED"))   
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}
module.exports.destroy = async (req, res, next) => {
    try {
        data= await assessService.destroyByCondition({id: req.params.id})
        if(data===1)
            res.json(responseSuccess("DELETE ASSESS SUCCESSFUL"))
        else
            res.json(responseWithError("DELETE ASSESS FAILED"))   
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}
module.exports.statistical = async (req, res, next) => {
    try {
        
        let data = await assessService.getByCondition({
            assess: { productId: req.params.productId }
        })
        let m = new Map();
        for(let ele of data) {
            let counter=m.get(ele.rate);
            if(!counter)
            {
                m.set(ele.rate, 1)
            }
            else
            {
                m.set(ele.rate, ++counter);
            }
        }
        let response =[];
        for(let [rate, count] of m){
            response.push({
                rate: rate,
                count: count
            })
        }
        res.json(responseSuccess(response))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}