const { responseSuccess, responseWithError } = require('./../utils/response')
const CONSTANT_MESSAGES = require('./../utils/constants/messages');

module.exports.uploadSingle = async (req, res) => {
    try {
        if (req.file) {
            return res.json(responseSuccess(req.file.path))
        }
        res.status(400).json(responseWithError(CONSTANT_MESSAGES.FILE_UPLOAD_FAILED))
        
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.uploadArray = async (req, res) => {
    try {
        if (req.files.length > 0) {
            let urls = req.files.map(ele => {
                return ele.path
            })
            return res.status(200).json(responseSuccess(urls))
        }
        res.status(400).json(responseWithError(CONSTANT_MESSAGES.FILE_UPLOAD_FAILED))
        
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}


