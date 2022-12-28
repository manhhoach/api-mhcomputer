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
    const againLink = `${req.protocol}://${req.headers.host}/`;
    const transaction = new Transaction(order, clientIp, againLink);
    let url = null;
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

