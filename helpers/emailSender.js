const nodemailer = require('nodemailer');

const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
        user: 'litoleksii@meta.ua',
        pass: process.env.SENDGRID_API_KEY,
    },
}

const transporter = nodemailer.createTransport(config)

module.exports = { transporter }