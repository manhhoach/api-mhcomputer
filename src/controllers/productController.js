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


let property_array = ['ram', 'o-cung', 'vga---card-man-hinh', 'kich-thuoc-man-hinh', 'do-phan-giai-man-hinh',
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
    if (_product.imageUrl) {
        _product.imageUrl = _product.imageUrl.split(";")
    }

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

module.exports.getAllPaging = async (req, res, next) => {
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
            condition.categoryId = parseInt(req.query.categoryId)
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
            if (property_array.includes(element)) {
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

        products = await Promise.all(products.map(async (ele) => {
            let property_product = await productDetailService.getByCondition({ productId: ele.id })

            return responseProduct(ele, property_product)
        }))

        let response = getPagingData({ count: products.length, rows: products }, page_index, limit);
        res.json(responseSuccess(response));

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.create = async (req, res, next) => {
    try {
        let body = { ...req.body };
        delete body.property;
        if (body.imageUrl && body.imageUrl.length > 0) {
            body.imageUrl = body.imageUrl.join(";");
        }
        let product = await productService.create(body);
        let property = req.body.property.map(ele => {
            return {
                ...ele,
                productId: product.dataValues.id
            }
        });
        await productDetailService.bulkCreate(property)
        res.json(responseSuccess(product.dataValues));


    }
    catch (err) {
        console.log(err)
        res.json(responseWithError(err))
    }
}

module.exports.getById = async (req, res, next) => {
    try {
        let [product, property, stored] = await Promise.all([
            productService.getById(req.params.id),
            productDetailService.getByCondition({ productId: req.params.id }),
            storedProductService.getByCondition({ productId: req.params.id })
        ])

        let data = responseProduct(product, property)
        data.stored = stored.map(ele => ele.show_room)
        res.json(responseSuccess(data))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.delete = async (req, res, next) => {
    try {

        await Promise.all([
            productDetailService.destroyByCondition({
                productId: { [Op.in]: req.body.id }
            }),
            storedProductService.destroyByCondition({
                productId: { [Op.in]: req.body.id }
            }),
            productService.destroyByCondition({
                id: { [Op.in]: req.body.id }
            }),
            orderDetailService.destroyByCondition({ productId: { [Op.in]: req.body.id } }),
            markService.destroyByCondition({ productId: { [Op.in]: req.body.id } }),
            assessService.destroyByCondition({ productId: { [Op.in]: req.body.id } })

        ])
        res.json(responseSuccess("PRODUCT DELETE SUCCESSFUL"));


    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.update = async (req, res, next) => {
    try {

        let result_property = -1;
        if (req.body.property && req.body.property.length > 0) {
            result_property = await Promise.all(req.body.property.map(async (ele) => {
                return await productDetailService.updateByCondition({ value: ele.value }, { id: ele.productDetailId })
            }))
            delete req.body.property;
        }

        if (req.body.imageUrl.length > 0) {
            req.body.imageUrl = req.body.imageUrl.join(";");
        }
        let data = await productService.updateByCondition(req.body, { id: req.params.id });

        if (result_property === -1) {
            if (data[0] === 1) {
                res.json(responseSuccess('PRODUCT UPDATE SUCCESSFUL'))
            }
            else {
                res.json(responseWithError('PRODUCT UPDATE FAILED'))
            }
        }
        else {
            let result = [...data, ...result_property.flat()];
            if (result.includes(1)) {
                res.json(responseSuccess('PRODUCT UPDATE SUCCESSFUL'))
            }
            else {
                res.json(responseWithError('PRODUCT UPDATE FAILED'))
            }
        }




    }
    catch (err) {
        res.json(responseWithError(err))
    }
}