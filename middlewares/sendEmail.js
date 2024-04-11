require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_ACCOUNT,
                pass: process.env.GOOGLE_ACCOUNT_PASSWORD,
            },
        });

        const options = {
            from: process.env.GOOGLE_ACCOUNT,
            to: email,
            subject: subject,
            html: text
        };

        await transporter.sendMail(options, function(error, infor) {
            if (error) {
                console.log("Failed to save email: "+error.message);
                return error.message;
            } else {
                console.log("Email Sent: "+infor.response);
                return "Email Sent: "+infor.response;
            }
        });
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;