const models=require('./../connectDB/db');


module.exports.getAll=async()=>{
    return models.property_value.findAll({});
}

module.exports.create=async(property_value)=>{
    return models.property_value.create(property_value);
}

module.exports.bulkCreate=async(property_value)=>{
    return models.property_value.bulkCreate(property_value);
}

module.exports.getPropertyByCategoryId=async(category_id)=>{
    return models.property_value.findAll({
        where: {
            categoryId: category_id
        },
        include: models.property
        
    })
}