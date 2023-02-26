const responseSuccess = (data) => {
    return {
        success: true,
        data
    };
}

const responseWithError = (err) => {
    if(err.message==="Validation error")
        err.message=err.errors[0].message
    return {
        success: false,
        error: err.message ? err.message : err
    };
}

module.exports = { responseSuccess, responseWithError }