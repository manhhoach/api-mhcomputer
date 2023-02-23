const AppError = require('./../utils/AppError')
const validateData = (validationObj) => {
    return (req, res, next) => {   
        const { error } = validationObj.validate(req.body);
        if (error) {
            return next(new AppError(400, error.details[0].message))
        }
        next();
    }
}

module.exports = validateData
