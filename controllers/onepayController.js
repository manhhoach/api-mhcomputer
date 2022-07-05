const { Transaction, validateReturnURL } = require('./../services/onepayService');

exports.checkout = async (req, res) => {
    const { order, transactionType } = req.body;
    var clientIp =
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);

    if (clientIp.length > 15) {
        clientIp = '127.0.0.1';
    }
    const againLink = `http://${req.headers.host}/`;
    // console.log(order, clientIp, againLink);
    const transaction = new Transaction(order, clientIp, againLink);
    var url = null;
    try {
        url = await transaction.createTransactionURL(transactionType, againLink);
        return res.json({ url, clientIp });
    } catch (error) {
        return res.send(error);
    }
}

exports.callback = (req, res) => {
    const transactionType = req.params.gateway;
    const query = req.query;
    validateReturnURL(query, transactionType).then(result => {
        if (result.isSuccess) {
            res.json({
                success: true,
            });
        } else {
            res.json({
                success: false,
            });
        }
    })
}


// let url = {
//     vpc_Version: '2',
//     vpc_Currency : 'VND',
//     vpc_Command : 'pay',
//     vpc_Locale : 'vn',
//     // vpc_ReturnURL: 'http://localhost:3000/onepay/',
//     vpc_OrderInfo : `node-${now.toISOString()}`,
//     vpc_Amount : 10000,
//     againLink: `http://${req.headers.host}/`,
//     vpc_Customer_Id : 1,
//     clientIp : '127.0.0.1'
    
// }