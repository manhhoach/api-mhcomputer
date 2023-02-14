const stripe=require('stripe')('sk_test_51JnCLGHHZgJAXgW0FilTG2ffM37O2WdSypyeEcgejMiupnk9pQHlLzbtucaqREcy6SOLqHoW8WF0HEp98dxXYA3H00OSCy9B2R')


exports.createSession=(products, success_url, cancel_url)=>{
    return stripe.checkout.sessions.create({
        line_items: products,
        mode: 'payment',
        success_url: success_url,
        cancel_url: cancel_url
    })
}

exports.createPaymentIntents=(amount)=>{
    return stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
      });
}