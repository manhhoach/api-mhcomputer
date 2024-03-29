const productService = require('../services/product')
const productDetailService = require('../services/product_detail')
const storedProductService = require('../services/stored_product')
const orderDetailService = require('../services/order_detail')
const markService = require('../services/mark')
const assessService = require('../services/assess')
const { responseSuccess } = require('../utils/response')
const { getPagingData, getPagination } = require('../utils/pagination');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const CONSTANT_MESSAGES = require('../utils/constants/messages');
const tryCatch = require('../utils/tryCatch');
const AppError = require('../utils/AppError');

const PROPERTY_ARR = ['ram', 'o-cung', 'vga---card-man-hinh', 'kich-thuoc-man-hinh', 'do-phan-giai-man-hinh',
    'cam-ung-man-hinh', 'tan-so-man-hinh', 'he-dieu-hanh', 'dong-cpu', 'the-he-cpu', 'socket', 'chip-set',
    'so-khe-cam-ram', 'loai-ram', 'dung-luong-o-cung', 'bus-ram', 'den-led', 'gpu', 'loai-o-cung',
    'toc-do-vong-quay', 'bo-nho-dem', 'loai-case', 'chat-lieu', 'mau', 'cong-suat', 'dung-luong-ram'
]

const filterProduct = async (data) => {
    let product_id = await Promise.all(data.map(async (ele) => {
        return await productDetailService.query(`SELECT productId from product_details where product_details.propertyName='${ele.propertyName}' and product_details.value like '%${ele.value}%'`)
    }));
    let temp = product_id.flat().map(ele => ele.productId);
    let m = new Map();
    temp.map(ele => {
        let counter = m.get(ele)
        if (!counter)
            m.set(ele, 1);
        else
            m.set(ele, ++counter)
    })
    let productId = [];
    for (let [key, counter] of m) {
        if (counter == product_id.length)
            productId.push(key)
    }
    return productId
}

const responseProduct = (product, property) => {
    property = property.map(ele => {
        return {
            productDetailId: ele.id,
            propertyName: ele.property.name,
            value: ele.value
        }
    });
    let _product = { ...product.dataValues };

    let data = { ..._product, property };
    return data;
}

module.exports.getAllPaging = tryCatch(async (req, res, next) => {

    const page_index = parseInt(req.query.page_index);
    const page_size = parseInt(req.query.page_size);
    const { limit, offset } = getPagination(page_index, page_size)
    let productCondition = {};
    let data = {
        limit: limit,
        offset: offset
    };
    if (req.query.categoryId) {
        productCondition.categoryId = {
            [Op.in]: req.query.categoryId.split(';').map(ele => parseInt(ele))
        }
    }
    if (req.query.brandId) {
        productCondition.brandId = parseInt(req.query.brandId)
    }
    if (req.query.sort) {
        if (req.query.sort.startsWith('-')) {
            let columnName = req.query.sort.split('-')[1];
            data.order = [[columnName, 'DESC']]
        }
        else {
            data.order = [[req.query.sort, 'ASC']]
        }
    }
    else {
        data.order = [['createdDate', 'DESC']];
    }
    if (req.query.name) {
        productCondition.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('product.name')), 'LIKE', '%' + req.query.name.toLowerCase() + '%')
    }
    if (req.query.price_start && req.query.price_end) {
        productCondition.price = {
            [Op.between]: [
                parseInt(req.query.price_start),
                parseInt(req.query.price_end)
            ]
        }
    }
    else if (req.query.price_start) {
        productCondition.price = {
            [Op.gte]: parseInt(req.query.price_start)
        }
    }
    else if (req.query.price_end) {
        productCondition.price = {
            [Op.lte]: parseInt(req.query.price_end)
        }
    }

    let propertyCondition = [];
    for (let element in req.query) {
        if (PROPERTY_ARR.includes(element)) {
            propertyCondition.push({
                propertyName: element,
                value: req.query[element]
            });
        }
    }
    if (propertyCondition.length > 0) {
        productCondition.id = {
            [Op.in]: await filterProduct(propertyCondition)
        }
    }

    let products = await productService.getAllPagingAndFilterWithProperty(data, productCondition);
    let response = getPagingData(products, page_index, limit);
    res.status(200).json(responseSuccess(response));

})

module.exports.create = tryCatch(async (req, res, next) => {

    let body = { ...req.body };
    delete body.property;

    let product = await productService.create(body);
    let property = req.body.property.map(ele => {
        return {
            ...ele,
            productId: product.id
        }
    });
    await productDetailService.bulkCreate(property)
    res.status(201).json(responseSuccess(product));

})

module.exports.getById = tryCatch(async (req, res, next) => {

    let [product, property, storedShowroom] = await Promise.all([
        productService.getById(req.params.id),
        productDetailService.getByCondition({ productId: req.params.id }),
        storedProductService.getByCondition({ productId: req.params.id })
    ])

    let data = responseProduct(product, property)
    data.storedShowroom = storedShowroom.map(ele => ele.show_room)
    res.status(200).json(responseSuccess(data))
})

module.exports.delete = tryCatch(async (req, res, next) => {

    await Promise.all([
        productDetailService.destroyByCondition({
            productId: req.params.id
        }),
        storedProductService.destroyByCondition({
            productId: req.params.id
        }),
        productService.destroyByCondition({
            id: req.params.id
        }),
        orderDetailService.destroyByCondition({ productId: req.params.id }),
        markService.destroyByCondition({ productId: req.params.id }),
        assessService.destroyByCondition({ productId: req.params.id })

    ])
    res.status(200).json(responseSuccess(CONSTANT_MESSAGES.DELETE_SUCCESSFULLY));

})

module.exports.update = tryCatch(async (req, res, next) => {

    let result_property = -1;
    if (req.body.property && req.body.property.length > 0) {
        result_property = await Promise.all(req.body.property.map(async (ele) => {
            return await productDetailService.updateByCondition({ value: ele.value }, { id: ele.productDetailId })
        }))
        delete req.body.property;
    }

    let data = await productService.updateByCondition(req.body, { id: req.params.id });

    if (result_property === -1) {
        if (data[0] === 1) {
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
        }
        else {
            next(new AppError(400,CONSTANT_MESSAGES.UPDATE_FAILED))
        }
    }
    else {
        let result = [...data, ...result_property.flat()];
        if (result.includes(1)) {
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
        }
        else {
            next(new AppError(400,CONSTANT_MESSAGES.UPDATE_FAILED))
        }
    }
})