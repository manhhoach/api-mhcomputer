const userService = require('./../services/userService')
const jwt_token = require('./../middlewares/jwt_token');
const { responseSuccess, responseWithError } = require('./../utils/response')
const bcryptjs = require('bcryptjs');
const fetch = require('node-fetch')
const mailService = require('./../services/mailService')
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken')




module.exports.getMe = async (req, res, next) => {
    try {
        res.json(responseSuccess(req.user))
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.register = async (req, res, next) => {
    try {
        let user = { ...req.body };
        let data = await userService.create(user);
        delete data.dataValues.password;
        res.json(responseSuccess(data.dataValues));

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.login = async (req, res, next) => {
    try {
        let user = await userService.findOne({ email: req.body.email }, true);

        if (user) {
            user = user.dataValues;
            let checkPassword = bcryptjs.compareSync(req.body.password, user.password);
            if (checkPassword) {
                let token = jwt_token.signToken({
                    id: user.id
                })
                delete user.password;
                res.json(responseSuccess({ ...user, token }))
            }
            else {
                res.json(responseWithError("PASSWORD IS INVALID"))
            }
        }
        else {
            res.json(responseWithError("USER IS NOT EXIST"))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.updateMe = async (req, res, next) => {
    try {
        if (req.body.status)
            delete req.body.status;
        if (req.body.password)
            delete req.body.password;

        let data = await userService.updateByCondition(req.body, { id: req.user.id });
        if (data[0] === 1) {
            data = await userService.findOne({ id: req.user.id }, false);
            res.json(responseSuccess(data))
        }
        else {
            res.json(responseWithError('UPDATE FAIL'))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.changePassword = async (req, res, next) => {
    try {
        let password = (await userService.findOne({ id: req.user.id }, true)).password;
        let checkPassword = bcryptjs.compareSync(req.body.oldPassword, password);
        if (checkPassword) {
            let data = await userService.updateByCondition({ password: req.body.newPassword }, { id: req.user.id });
            if (data[0] === 1)
                res.json(responseSuccess('PASSWORD UPDATE SUCCESSFUL'))
            else {
                res.json(responseWithError('PASSWORD UPDATE FAILED'))
            }
        }
        else {
            res.json(responseWithError('PASSWORD IS INVALID'))
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.loginWithFacebookAPI = async (req, res, next) => {
    try {
        const { accessToken } = req.body;
        const response = await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
        const json = await response.json()
        let user, token;
        let checkWithFacebookId = await userService.findOne({ facebookId: json.id });
        if (checkWithFacebookId) {
            user = checkWithFacebookId;
        } else {
            user = await userService.create({ facebookId: json.id, fullName: json.name })
        }
        token = jwt_token.signToken({
            id: user.id
        })
        res.json(responseSuccess({ ...user.dataValues, token }));
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.loginWithGoogleAPI = async (req, res, next) => {
    let data = {
        googleId: req.body.user.id,
        email: req.body.user.email,
        fullName: req.body.user.name || `${req.body.user.familyName} ${req.body.user.givenName}`,
        status: 0
    };
    let user, token;

    let checkWithOutGoogleId = await userService.findOne({
        email: data.email,
        googleId: null
    }, false);

    if (checkWithOutGoogleId) {
        await userService.updateByCondition({ googleId: data.googleId }, { id: checkWithOutGoogleId.id });
        user = await userService.findOne({ id: checkWithOutGoogleId.id }, false);
    } else {
        let checkWithGoogleId = await userService.findOne({
            email: data.email,
            googleId: data.googleId
        }, false);
        if (checkWithGoogleId) {
            user = checkWithGoogleId;
        }
        else {
            user = await userService.create(data);
        }
    }
    token = jwt_token.signToken({
        id: user.id
    })
    res.json(responseSuccess({ ...user.dataValues, token }));
}


module.exports.updateToAdmin = async (req, res, next) => {
    try {
        await userService.updateByCondition({ status: 1 }, { email: req.body.email });
        res.json(responseSuccess());
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.getAll = async (req, res, next) => {
    try {
        let data = await userService.getByCondition({ status: req.query.status });
        res.json(responseSuccess(data));
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.forgotPassword = async (req, res, next) => {
    try {
        let user = await userService.findOne({ email: req.body.email }, false);
        if (user) {
            let token = jwt_token.signToken({ id: user.id })
            let url = `${req.protocol}://${req.get('host')}/user/reset-password/${token}`
            let data = await mailService.sendMail(req.body.email, url)
            if (data.rejected.length === 0)
                res.json(responseSuccess());
            else
                res.json(responseWithError())
        }
        else {
            res.json(responseWithError("USER IS NOT EXIST"))
        }

    }
    catch (err) {
        console.log(err)
        res.json(responseWithError(err))
    }
}

module.exports.resetPassword = async (req, res, next) => {
    try {
        let decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
        if (new Date() < new Date(decoded.exp)) {
            let user = await userService.findOne({ id: decoded.id }, false);
            if (user) {
                await userService.updateByCondition({ password: req.body.password }, { id: user.id });
                res.json(responseSuccess("RESET PASSWORD SUCCESSFUL"))
            }
            else {
                res.json(responseWithError("USER IS NOT EXIST"))
            }
        }
        else {
            res.json(responseWithError("TOKEN IS INVALID"))
        }
    }
    catch (err) {
        res.json(responseWithError(err))
    }
}