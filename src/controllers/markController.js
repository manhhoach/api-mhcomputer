const markService = require('./../services/markService');
const { responseSuccess, responseWithError } = require('./../utils/response');
const { getPagingData, getPagination } = require('./../utils/pagination');

module.exports.getMarkList = async (req, res, next) => {
    try {
        let page_index = req.query.page_index, page_size = req.query.page_size;
        const { limit, offset } = getPagination(page_index, page_size)
        let data = await markService.getByCondition({ userId: req.user.id, status: req.query.status }, limit, offset);
        data=data.map(ele=>{
            let temp=ele.dataValues;
            delete temp.user;
            temp.product=ele.product.dataValues;
            return temp;
        })
        let response=getPagingData({rows: data, count: data.length}, page_index, limit)
        res.json(responseSuccess(response))
    }
    catch (err) {
        res.json(responseWithError(err));
    }
}

module.exports.create = async (req, res, next) => {
    try {
        let body = {
            userId: req.user.id,
            productId: req.body.productId,
            status: req.body.status // 0: like, 1: mua sau
        }
        let data = await markService.create(body);
        res.json(responseSuccess(data.dataValues))
    }
    catch (err) {
        res.json(responseWithError(err));
    }
}

// module.exports.update = async (req, res, next) => {
//     try {
//         let body = { ...req.body }
//         body.detailAddress = JSON.stringify(req.body.detailAddress);

//         let data = await markService.updateByCondition(body, { id: req.params.id, userId: req.user.id });
//         if (data[0] === 1) {
//             data = await markService.getByCondition({ id: req.params.id });
//             res.json(responseSuccess(responseAddress(data[0].dataValues)))
//         }
//         else {
//             res.json(responseWithError())
//         }
//     }
//     catch (err) {
//         res.json(responseWithError(err));
//     }
// }

module.exports.destroy = async (req, res, next) => {
    try {
        let data = await markService.destroyByCondition({ id: req.params.id, userId: req.user.id });
        if (data === 1) {
            res.json(responseSuccess())
        }
        else {
            res.json(responseWithError())
        }
    }
    catch (err) {
        res.json(responseWithError(err));
    }
}