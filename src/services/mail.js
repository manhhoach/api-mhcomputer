const nodemailer = require('nodemailer')
require('dotenv').config();
const mailTemplate = require('../utils/mailTemplate')
const { OAuth2Client } = require('google-auth-library')

module.exports.sendMail = async (email, url) => {
    const oAuth2Client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET)
    oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN })

    let accessToken = await oAuth2Client.getAccessToken();
    accessToken = accessToken.token;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.GMAIL,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken
        }
    })

    const mailOptions = {
        to: email,
        subject: 'Forgot password',
        html: mailTemplate.mailResetPassword.replace('URL_RESET_PASSWORD', url)
    }
    return transporter.sendMail(mailOptions)
}