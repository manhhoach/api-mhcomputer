const fs = require('fs');
const models = require('../connectDB/db')
const formatText= require('./formatText');

// fs.readFile('./db/brands.json', 'utf-8', async (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         data = JSON.parse(data);
//         let x = data.RECORDS;
//         console.log(x)
//         await models.brand.bulkCreate(x);
//         console.log('xong')
//     }
// })

// fs.readFile('./db/categories.json', 'utf-8', async (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         data = JSON.parse(data);
//         let x = data.RECORDS;
//         await models.category.bulkCreate(x);
//         console.log('xong')
//     }
// })

fs.readFile('./db/property_new.json', 'utf-8', async (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        data = JSON.parse(data);
        let x = data.RECORDS.map(ele=>{
            return {
                id:ele.Id,
                name:ele.Name,
                extendName: formatText(ele.Name),
                createdDate: new Date()
            }
        });
        await models.property.bulkCreate(x)
        console.log('xong')
    }
})