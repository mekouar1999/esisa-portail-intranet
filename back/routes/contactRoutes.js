const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  try {
    const { subject, nom, prenom, classe, groupe, message } = req.body;

// Envoi d'un e-mail avec nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.PASSWORD,
  },
});

const mailOptions = {
    from: process.env.MAIL_ID,
    to: process.env.MAIL_ID,
    subject: "Nouveau message de contact",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
        <h2 style="color: #007bff; margin-bottom: 20px;">Nouveau message de contact</h2>
        <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Sujet:</strong> ${subject}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Nom:</strong> ${nom}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Prénom:</strong> ${prenom}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Classe:</strong> ${classe}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Groupe:</strong> ${groupe}</p>
          <p style="font-size: 16px; margin-bottom: 0;"><strong>Message:</strong> ${message}</p>
        </div>
      </div>
    `,
  };
  

    await transporter.sendMail(mailOptions);

    console.log("E-mail de contact envoyé avec succès");
    res.status(200).send("Message de contact envoyé avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message de contact :", error);
    res.status(500).send("Erreur lors de l'envoi du message de contact : " + error.message);
  }
});

module.exports = router;
