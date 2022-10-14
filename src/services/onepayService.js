const Joi = require("joi");
const { OnePayDomestic, OnePayInternational } = require('vn-payments');

const config = {
    onepay: {
        domestic: {
            paymentGateway: "https://mtf.onepay.vn/onecomm-pay/vpc.op",
            merchant: "ONEPAY",
            accessCode: "D67342C2",
            secureSecret: "A3EFDFABA8653DF2342E8DAC29B51AF0"
        },
        international: {
            paymentGateway: "https://mtf.onepay.vn/vpcpay/vpcpay.op",
            merchant: "TESTONEPAY",
            accessCode: "6BEB2546",
            secureSecret: "6D0870CDE5F24F34F3915FB0045120DB"
        }
    }
}
const onepaySchema = Joi.object({
    accessCode: Joi.string()
        .required(),
    merchant: Joi.string()
        .required(),
    secureSecret: Joi.string()
        .required(),
    paymentGateway: Joi.string()
        .required(),
})

const onepayInt = new OnePayInternational(config.onepay.international);

const onepayDom = new OnePayDomestic(config.onepay.domestic);

class Onepay {
    constructor(onepay) {
        const { error } = onepaySchema.validate(onepay);
        if (error) {
            throw error;
        }
        Object.assign(this.onepay);
    }
}

const orderSchema = Joi.object({
    amount: Joi.number()
        .required(),
    customerId: Joi.string()
        .required(),
})

class Order {
    constructor(order) {
        const { error } = orderSchema.validate(order);
        if (error) {
            throw error;
        }
        Object.assign(this, order);
    }
}

const transactionSchema = Joi.object({
    vpcVersion: Joi.number()
        .required(),
    currency: Joi.string()
        .required(),
    vpcCommand: Joi.string()
        .required(),
    locale: Joi.string()
        .required(),
    transactionId: Joi.string()
        .required(),
    orderId: Joi.string()
        .required(),
    amount: Joi.string()
        .required(),
    clientIp: Joi.string()
        .required(),
    customerId: Joi.string()
        .required(),
});

class Transaction {
    /**
     * 
     * @param {Order} order 
     * @param {Onepay} onepay 
     * @param {String} clientIp
     */
    constructor(order, clientIp, againLink) {
        this.vpcVersion = '2';
        this.currency = 'VND';
        this.locale = 'vn';
        this.vpcCommand = 'pay';
        this.transactionId = `${Date.now()}`;
        this.orderId = `${Date.now()}`;
        this.amount = order.amount;
        this.customerId = order.customerId;
        this.clientIp = clientIp;
        this.againLink = againLink;
        var { error } = transactionSchema.validate();
        if (error) {
            throw error;
        }
    }

    get transactionData() {
        var data = {};
        Object.assign(data, this);
        return data;
    }
    createTransactionURL(transactionType, againLink) {
        switch (transactionType) {
            case 'domestic':
                this.returnUrl = `${againLink}onepay/domestic/callback`;
                return onepayDom.buildCheckoutUrl(this.transactionData);
            case 'international':
                this.returnUrl = `${againLink}onepay/international/callback`;
                return onepayInt.buildCheckoutUrl(this.transactionData);
            default:
                break;
        }
    }
}
/**
 * 
 * @param {*} query 
 * @param {*} transactionType 
 * @returns 
 */
function validateReturnURL(query, transactionType) {
    switch (transactionType) {
        case 'domestic':
            return onepayDom.verifyReturnUrl(query);
            break;
        case 'international':
            return onepayInt.verifyReturnUrl(query);
        default:
            break;
    }
}

module.exports = { Transaction, validateReturnURL }
