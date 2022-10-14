const responseSuccess=(data)=> {
    return {
        success: true,
        data
    };
}

const responseWithError=(data) =>{
    return {
        success: false,
        errors: data
    };
}

module.exports = { responseSuccess, responseWithError }