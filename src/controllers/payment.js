const { responseSuccess, responseWithError } = require('../utils/response')
const paymentService=require('../services/payment')

const calcAmount=(products)=>{
    let amount=products.reduce((init, nextItem)=>{
        return init+nextItem.price*nextItem.quantity;
    }, 0)
    return amount
}

exports.createSession = async (req, res) => {
    const RETURN_URL=`${req.protocol}://${req.get('host')}/payment/get-status-payment`
    try {
        let products=req.body.products.map(product=>{
            return {
                price_data: {
                    currency: 'vnd',
                    product_data: {
                        name: product.name
                    },
                    unit_amount: product.price,
                },
                quantity: product.quantity
            }
        })

        const SUCCESS_URL=`${RETURN_URL}/success`
        const CANCEL_URL=`${RETURN_URL}/cancel`
        let data=await paymentService.createSession(products, SUCCESS_URL, CANCEL_URL)
        res.json(responseSuccess(data.url))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}

exports.checkout=async(req, res)=>{
    try{
        
        res.json(responseSuccess(req.params.status==='success'? 'success': 'cancel'))
    }
    catch(err){
        
    }
}

exports.createPaymentIntent = async (req, res) => {
    try {
        let amount=calcAmount(req.body.products)
        let paymentIntent=await paymentService.createPaymentIntents(amount)
        res.json(responseSuccess({clientSecret: paymentIntent.client_secret}))

    }
    catch (err) {
        res.json(responseWithError(err))
    }
}
