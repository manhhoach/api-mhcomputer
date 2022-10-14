const jwt = require('jsonwebtoken')
const { responseSuccess, responseWithError } = require("./../utils/response");
const userService = require('./../services/userService')

module.exports.signToken = (user) => {
    return jwt.sign({
        ...user,
        iat: new Date().getTime(),
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    }, process.env.SECRET_KEY, { algorithm: 'HS512' });
}
module.exports.checkToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (new Date() < new Date(decoded.exp)) {
            let user = await userService.findOne({ id: decoded.id }, false);
            req.user = user.dataValues;
        }
        next()
    }
    catch (err) {
        res.json(responseWithError("Invalid or expired token provided!"));
    }
}

module.exports.checkAdmin = async (req, res, next) => {
    if (req.user.status > 0)
        next()
    else
        res.json(responseWithError("You can not access this route"));
}

module.exports.checkOwner = async (req, res, next) => {
    if (req.user.status > 1)
        next()
    else
        res.json(responseWithError("You can not access this route"));
}

