const responseSuccess=(data)=> {
    return {
        success: true,
        data
    };
}

const responseWithError=(err) =>{
    console.log(err);
    return {
        success: false,
        error: err.message?err.message:err
    };
}

module.exports = { responseSuccess, responseWithError }