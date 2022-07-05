const fs = require('fs');
const models = require('./../connectDB/db')
fs.readFile('./utils/new_cities.json', 'utf-8', async (err, data)=>{
    if(err){
        console.log(err);
    }
    else
    {
        data=JSON.parse(data);
        let x=data.RECORDS.map((ele)=>{
            let temp={
                id: ele.Id, name: ele.Name
            }
            return temp;
        })
      //  console.log(x)
        await models.city.bulkCreate(x);
        console.log('xong')
    }
})

fs.readFile('./utils/new_districts.json', 'utf-8', async (err, data)=>{
    if(err){
        console.log(err);
    }
    else
    {
        data=JSON.parse(data);
        let x=data.RECORDS.map((ele)=>{
            let temp={
                id: ele.Id, name: ele.Name, cityId: ele.CityId
            }
            return temp;
        })
       // console.log(x)
        await models.district.bulkCreate(x);
        console.log('xong')
    }
})
fs.readFile('./utils/new_wards.json', 'utf-8', async (err, data) => {
    if (err) {
        console.log(err);
    }
    else {
        data = JSON.parse(data);
        let x = data.RECORDS.map((ele) => {
            let temp = {
                id: ele.Id, name: ele.Name, districtId: ele.DistrictId
            }
            return temp;
        })
        console.log(x)
        await models.ward.bulkCreate(x);
        console.log('xong')
    }
})