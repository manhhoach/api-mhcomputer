const jwt = require('jsonwebtoken')
const { responseWithError } = require("./../utils/response");
const userService = require('./../services/userService')

module.exports.signAccessToken = (user) => {
    return jwt.sign({
        ...user
    }, process.env.SECRET_KEY_ACCESS_TOKEN, { expiresIn: '6h'  });
}
module.exports.signRefreshToken = (user) => {
    return jwt.sign({
        ...user
    }, process.env.SECRET_KEY_REFRESH_TOKEN, { expiresIn: '3d'  });
}


module.exports.checkAccessToken = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);
        let user = await userService.findOne({ id: decoded.id });
        if(user)
        {
            req.user = user.dataValues;
            return next()
        }
        return res.json(responseWithError("User not found"));
    }
    catch (err) {
        res.json(responseWithError("Invalid or expired token provided!"));
    }
}

module.exports.checkTokenV2 = async (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY);

        let user = await userService.getOne({ id: decoded.id });
        if(user)
        {
            req.user = user.dataValues;
            return next()
        }
        return res.json(responseWithError("User not found"));
    }
    catch (err) {
        res.json(responseWithError("Invalid or expired token provided!"));
    }
}

module.exports.checkAdmin = async (req, res, next) => {
    if (req.user.status >= 1)
        next()
    else
        res.json(responseWithError("You can not access this route"));
}

module.exports.checkOwner = async (req, res, next) => {
    if (req.user.status === 2)
        next()
    else
        res.json(responseWithError("You can not access this route"));
}

