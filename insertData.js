const fs = require('fs');
const models = require('./connectDB/db')
// fs.readFile('./utils/new_cities.json', 'utf-8', async (err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     else
//     {
//         data=JSON.parse(data);
//         let x=data.RECORDS.map((ele)=>{
//             let temp={
//                 id: ele.Id, name: ele.Name
//             }
//             return temp;
//         })
//       //  console.log(x)
//         await models.city.bulkCreate(x);
//         console.log('xong')
//     }
// })

// fs.readFile('./utils/new_districts.json', 'utf-8', async (err, data)=>{
//     if(err){
//         console.log(err);
//     }
//     else
//     {
//         data=JSON.parse(data);
//         let x=data.RECORDS.map((ele)=>{
//             let temp={
//                 id: ele.Id, name: ele.Name, cityId: ele.CityId
//             }
//             return temp;
//         })
//        // console.log(x)
//         await models.district.bulkCreate(x);
//         console.log('xong')
//     }
// })
// fs.readFile('./utils/new_wards.json', 'utf-8', async (err, data) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         data = JSON.parse(data);
//         let x = data.RECORDS.map((ele) => {
//             let temp = {
//                 id: ele.Id, name: ele.Name, districtId: ele.DistrictId
//             }
//             return temp;
//         })
//         console.log(x)
//         await models.ward.bulkCreate(x);
//         console.log('xong')
//     }
// })


const insertData = async (name) => {
    let path = `./db-mhcomputer/${name}.json`;

    let records = fs.readFileSync(`${path}`, 'utf-8')
    records = JSON.parse(records);
    
    await models[name].bulkCreate(records.RECORDS);
    console.log('xong');
}



insertData('orders')
insertData('order_details')
insertData('marks')
insertData('assesses')