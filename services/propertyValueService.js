const models=require('./../connectDB/db');


module.exports.getAll=async()=>{
    return models.property_values.findAll({});
}

module.exports.create=async(data)=>{
    return models.property_values.create(data);
}

module.exports.bulkCreate=async(data)=>{
    return models.property_values.bulkCreate(data);
}

module.exports.getPropertyByCategoryId=async(category_id)=>{
    return models.property_values.findAll({
        where: {
            categoryId: category_id
        },
        include: models.properties
        
    })
}