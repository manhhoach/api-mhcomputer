const productService = require('./../services/productService')
const productDetailService = require('./../services/productDetailService')
const storedProductService = require('./../services/storedProductService')
const orderDetailService = require('./../services/orderDetailService')
const markService = require('./../services/markService')
const assessService = require('./../services/assessService')
const { responseSuccess, responseWithError } = require('./../utils/response')
const { getPagingData, getPagination } = require('./../utils/pagination');
const sequelize = require('sequelize');
const { Op } = require('sequelize');
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

const PROPERTY_ARR = ['ram', 'o-cung', 'vga---card-man-hinh', 'kich-thuoc-man-hinh', 'do-phan-giai-man-hinh',
    'cam-ung-man-hinh', 'tan-so-man-hinh', 'he-dieu-hanh', 'dong-cpu', 'the-he-cpu', 'socket', 'chip-set',
    'so-khe-cam-ram', 'loai-ram', 'dung-luong-o-cung', 'bus-ram', 'den-led', 'gpu', 'loai-o-cung',
    'toc-do-vong-quay', 'bo-nho-dem', 'loai-case', 'chat-lieu', 'mau', 'cong-suat', 'dung-luong-ram'
]

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

const filterProduct = async (data) => {
    let strQuery = 'SELECT productId from properties join product_details on properties.id=product_details.propertyId';
    let product_id = await Promise.all(data.map(async (ele) => {
        return await productDetailService.query(`${strQuery} where properties.extendName='${ele.extendName}' and product_details.value like '%${ele.value}%'`)
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

module.exports.getAllPaging = async (req, res) => {
    try {
        const page_index = parseInt(req.query.page_index);
        const page_size = parseInt(req.query.page_size);
        const { limit, offset } = getPagination(page_index, page_size)
        let condition = {};
        let data = {
            limit: limit,
            offset: offset
        };
        if (req.query.categoryId) {
            condition.categoryId ={
                [Op.in]: req.query.categoryId.split(';').map(ele=>parseInt(ele))
            } 
        }
        if (req.query.brandId) {
            condition.brandId = parseInt(req.query.brandId)
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
            condition.name = sequelize.where(sequelize.fn('LOWER', sequelize.col('product.name')), 'LIKE', '%' + req.query.name.toLowerCase() + '%')
        }
        if (req.query.price_start && req.query.price_end) {
            condition.price = {
                [Op.between]: [
                    parseInt(req.query.price_start),
                    parseInt(req.query.price_end)
                ]
            }
        }
        else if (req.query.price_start) {
            condition.price = {
                [Op.gte]: parseInt(req.query.price_start)
            }
        }
        else if (req.query.price_end) {
            condition.price = {
                [Op.lte]: parseInt(req.query.price_end)
            }
        }

        let property = [];
        for (let element in req.query) {
            if (PROPERTY_ARR.includes(element)) {
                property.push({
                    extendName: element,
                    value: req.query[element]
                });
            }
        }
        if (property.length > 0) {
            condition.id = {
                [Op.in]: await filterProduct(property)
            }
        }
        data.condition = condition;

        let products = await productService.getAllPaging(data);
        let response = getPagingData(products, page_index, limit);
        res.status(200).json(responseSuccess(response));

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.create = async (req, res) => {
    try {
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

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.getById = async (req, res) => {
    try {
        let [product, property, storedShowroom] = await Promise.all([
            productService.getById(req.params.id),
            productDetailService.getByCondition({ productId: req.params.id }),
            storedProductService.getByCondition({ productId: req.params.id })
        ])

        let data = responseProduct(product, property)
        data.storedShowroom = storedShowroom.map(ele => ele.show_room)
        res.status(200).json(responseSuccess(data))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.delete = async (req, res) => {
    try {
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
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.update = async (req, res) => {
    try {
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
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
            }
        }
        else {
            let result = [...data, ...result_property.flat()];
            if (result.includes(1)) {
                res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
            }
            else {
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
            }
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}