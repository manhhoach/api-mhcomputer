const userService = require('./../services/userService')
const jwt_token = require('./../middlewares/jwt_token');
const { responseSuccess, responseWithError } = require('./../utils/response')
const bcryptjs = require('bcryptjs');
const fetch = require('node-fetch')

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


// hàm này tự mày mò, thực tế thì nên để front end làm
module.exports.loginWithGoogle = async (req, res, next) => {
    let data = {
        googleId: req.user.id,
        email: req.user.emails[0].value,
        fullName: req.user.displayName || `${req.user.name.familyName} ${req.user.name.givenName}`,
        status: 0
    };
    let user, token;

    let checkWithOutGoogleId = await userService.findOne({
        email: data.email,
        googleId: null
    }, false);

    if (checkWithOutGoogleId) {
        console.log("Đã tạo tk bằng gmail này")
        await userService.updateByCondition({ googleId: data.googleId }, { id: checkWithOutGoogleId.id });
        user = await userService.findOne({ id: checkWithOutGoogleId.id }, false);
    } else {
        let checkWithGoogleId = await userService.findOne({
            email: data.email,
            googleId: data.googleId
        }, false);
        if (checkWithGoogleId) {
            console.log("Đăng nhập lần thứ 2 bằng google")
            user = checkWithGoogleId;
        }
        else {
            console.log("Lần đầu tiên đăng nhập")
            user = await userService.create(data);
        }
    }
    token = jwt_token.signToken({
        id: user.id
    })
    res.json(responseSuccess({ ...user.dataValues, token }));
}

module.exports.loginWithFacebook = async (req, res, next) => {
    try {
        re.user = {
            id: '1682402945464501',
            username: undefined,
            displayName: 'Mạnh Hoạch',
            name: {
                familyName: undefined,
                givenName: undefined,
                middleName: undefined
            },
            gender: undefined,
            profileUrl: undefined,
            emails: [{ value: 'manhhn.nv5@gmail.com' }],
            provider: 'facebook',
            _raw: '{"id":"1682402945464501","name":"M\\u1ea1nh Ho\\u1ea1ch","email":"manhhn.nv5\\u0040gmail.com"}',
            _json: {
                id: '1682402945464501',
                name: 'Mạnh Hoạch',
                email: 'manhhn.nv5@gmail.com'
            }
        }
        console.log(req.user)
        let data = {
            facebookId: req.user.id,
            fullName: req.user.displayName,
            email: req.user.emails ? req.user.emails[0].value : null
        }

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

module.exports.updateAdmin= async (req, res, next) => {
    try
    {
        await userService.updateByCondition({ status: req.query.status }, { email: req.body.email });
        res.json(responseSuccess());
    }
    catch (err){
        res.json(responseWithError(err))
    }
}
module.exports.getAll= async (req, res, next) => {
    try
    {
        let data=await userService.getByCondition({ status: req.query.status });
        res.json(responseSuccess(data));
    }
    catch (err){
        res.json(responseWithError(err))
    }
}