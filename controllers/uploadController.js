const { responseSuccess, responseWithError } = require('./../utils/response')


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
            let urls=req.files.map(ele=> {
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