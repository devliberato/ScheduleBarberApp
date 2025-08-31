const nodemailer = require("nodemailer");
require("dotenv").config();


const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
});

const sendRecoveryEmail = (to, resetLink) => {

  const subject = "Recuperação de senha!";
  const body = `Para resgatar a sua senha clique no link a seguir: ${resetLink}`;

    transporter.sendMail({
        to,
        subject,
        text: body
    })
}

module.exports = sendRecoveryEmail;