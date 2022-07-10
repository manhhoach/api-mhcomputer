const dotenv = require('dotenv').config()
const fetch = require('node-fetch')

module.exports.getCoordinates = async (address)=>{
    try{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${process.env.MAP_BOX_KEY}`)
        const json = await response.json()
        return json;
    }
    catch (err) {
        return err;
    }
}