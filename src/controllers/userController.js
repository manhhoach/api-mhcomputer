const userService = require('./../services/userService')
const jwt_token = require('./../middlewares/jwt_token');
const { responseSuccess, responseWithError } = require('./../utils/response')
const bcryptjs = require('bcryptjs');
const fetch = require('node-fetch')
const mailService = require('./../services/mailService')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const CONSTANT_MESSAGES = require('./../utils/constants/messages');


module.exports.getMe = async (req, res) => {
    try {
        res.status(200).json(responseSuccess(req.user))
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.register = async (req, res) => {
    try {
        let user = { ...req.body };
        let data = await userService.create(user);
        delete data.dataValues.password;
        res.status(201).json(responseSuccess(data.dataValues));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.login = async (req, res) => {
    try {
        let user = await userService.findOne({ email: req.body.email }, true);
        if (user) {
            user = user.dataValues;
            let checkPassword = bcryptjs.compareSync(req.body.password, user.password);
            if (checkPassword) {
                let accessToken = jwt_token.signAccessToken({
                    id: user.id
                })
                let refreshToken = jwt_token.signRefreshToken({
                    id: user.id
                })
                delete user.password;
                res.status(200).json(responseSuccess({ ...user, accessToken, refreshToken }))
            }
            else {
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.INVALID_PASSWORD))
            }
        }
        else {
            res.status(404).json(responseWithError(CONSTANT_MESSAGES.USER_NOT_FOUND))
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.refreshToken = async (req, res) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decoded = jwt.verify(token, process.env.SECRET_KEY_REFRESH_TOKEN);
        let user = await userService.findOne({ id: decoded.id });
        if (user) {
            let accessToken = jwt_token.signAccessToken({ id: user.id })
            return res.status(200).json(responseSuccess(accessToken));
        }
        res.status(404).json(responseWithError(CONSTANT_MESSAGES.USER_NOT_FOUND));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.updateMe = async (req, res) => {
    try {
        if (req.body.status)
            delete req.body.status;
        if (req.body.password)
            delete req.body.password;

        let data = await userService.updateByCondition(req.body, { id: req.user.id });
        if (data[0] === 1) {
            data = await userService.findOne({ id: req.user.id }, false);
            res.status(201).json(responseSuccess(data))
        }
        else {
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.changePassword = async (req, res) => {
    try {
        let password = (await userService.findOne({ id: req.user.id }, true)).password;
        let checkPassword = bcryptjs.compareSync(req.body.oldPassword, password);
        if (checkPassword) {
            let data = await userService.updateByCondition({ password: req.body.newPassword }, { id: req.user.id });
            if (data[0] === 1)
                res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY))
            else {
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.UPDATE_FAILED))
            }
        }
        else {
            res.status(400).json(responseWithError(CONSTANT_MESSAGES.INVALID_PASSWORD))
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.loginWithFacebookAPI = async (req, res) => {
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
        res.status(200).json(responseSuccess({ ...user.dataValues, token }));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.loginWithGoogleAPI = async (req, res) => {
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
    res.status(200).json(responseSuccess({ ...user.dataValues, token }));
}


module.exports.updateToAdmin = async (req, res) => {
    try {
        await userService.updateByCondition({ status: 1 }, { email: req.body.email });
        res.status(201).json(responseSuccess(CONSTANT_MESSAGES.UPDATE_SUCCESSFULLY));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.getAll = async (req, res) => {
    try {
        let data = await userService.getByCondition({ status: req.query.status });
        res.status(200).json(responseSuccess(data));
    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.forgotPassword = async (req, res) => {
    try {
        let user = await userService.findOne({ email: req.body.email }, false);
        if (user) {
            let token = jwt_token.signToken({ id: user.id })
            let url = `${req.protocol}://${req.get('host')}/user/reset-password/${token}`
            let data = await mailService.sendMail(req.body.email, url)
            if (data.rejected.length === 0)
                res.status(200).json(responseSuccess(CONSTANT_MESSAGES.MESSAGE_SENT_SUCCESSFULLY));
            else
                res.status(400).json(responseWithError(CONSTANT_MESSAGES.MESSAGE_SENT_FAILED))
        }
        else {
            res.status(404).json(responseWithError(CONSTANT_MESSAGES.USER_NOT_FOUND))
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}

module.exports.resetPassword = async (req, res) => {
    try {
        let decoded = jwt.verify(req.params.token, process.env.SECRET_KEY);
        let user = await userService.findOne({ id: decoded.id }, false);
        if (user) {
            await userService.updateByCondition({ password: req.body.password }, { id: user.id });
            res.status(201).json(responseSuccess(CONSTANT_MESSAGES.RESET_PASSWORD_SUCCESSFULLY))
        }
        else {
            res.status(404).json(responseWithError(CONSTANT_MESSAGES.USER_NOT_FOUND))
        }

    }
    catch (err) {
        res.status(500).json(responseWithError(err))
    }
}