const { responseSuccess, responseWithError } = require('./../utils/response')
const cloudinary = require('./../keys/cloudinary');

module.exports.uploadSingle = async (req, res, next) => {
    try {
        if (req.file) {
            res.json(responseSuccess(
                req.file.path
            ))
        }
        else {
            res.json(responseWithError('FILE UPLOAD FAILED'))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.uploadArray = async (req, res, next) => {
    try {
        if (req.files.length > 0) {
            let urls = req.files.map(ele => {
                return ele.path
            })
            res.json(responseSuccess(urls))
        }
        else {
            res.json(responseWithError('FILE UPLOAD FAILED'))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}



module.exports.get = async (req, res, next) => {
    try {
        
        let options = { resource_type: "image", folder: "computer", max_results: req.query.max_results? parseInt(req.query.max_results):20 };
       
        let result = await cloudinary.api.resources(options)
        let data = result.resources.map(ele=>{
            return ele.url;
        })
        console.log(data)
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}


   