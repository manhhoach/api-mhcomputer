const nodemailer = require('nodemailer')
const dotenv = require('dotenv').config();
const mailTemplate=require('./../utils/mailTemplate')
const { OAuth2Client } = require('google-auth-library')

module.exports.sendMail = async (email, url) => {
    const oAuth2Client = new OAuth2Client(process.env.googleClientID_mail, process.env.googleClientSecret_mail)
    oAuth2Client.setCredentials({ refresh_token: process.env.refreshToken_mail })

    let accessToken = await oAuth2Client.getAccessToken();
    accessToken = accessToken.token;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.mail,
            clientId: process.env.googleClientID_mail,
            clientSecret: process.env.googleClientSecret_mail,
            refreshToken: process.env.refreshToken_mail,
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