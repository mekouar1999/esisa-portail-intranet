const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID, // Adresse e-mail de l'émetteur
      pass: process.env.PASSWORD, // Mot de passe de l'émetteur
    },
  });

  // Envoi du message avec l'objet de transport défini

  let info = await transporter.sendMail({
    from: '"ESISA OFFICIEL" <esisa.ac.ma@gmail.com>', // Adresse e-mail de l'émetteur
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html,
  });

  console.log("Message sent: %s", info.messageId);
});

module.exports = sendEmail;
