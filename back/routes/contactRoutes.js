const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");



router.post('/contact/info', async (req, res) => {
  try {
    const { nom, prenom, email, tel, baccalaureat, filiere, maths } = req.body;

    // // Vérification des champs requis
    // if (!nom || !prenom || !email || !tel || !baccalaureat || !filiere || !maths) {
    //   throw new Error('Veuillez remplir tous les champs obligatoires.');
    // }

    // Configuration du transporteur nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_ID,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MAIL_ID,
      to: process.env.MAIL_ID,
      subject: 'Nouvelle demande de pré inscription !',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h2 style="color: #007bff; margin-bottom: 20px;">Nouveau message d'information</h2>
          <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Nom:</strong> ${nom}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Prénom:</strong> ${prenom}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Baccalauréat:</strong> ${baccalaureat}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Filière:</strong> ${filiere}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Moyenne Générale:</strong> ${maths}</p>
            <p style="font-size: 16px; margin-bottom: 0;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px; margin-bottom: 0;"><strong>Téléphone:</strong> ${tel}</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log('E-mail d\'information envoyé avec succès');
    res.status(200).send('Message d\'information envoyé avec succès.');
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message d\'information :', error.message);
    res.status(500).send('Erreur lors de l\'envoi du message d\'information : ' + error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const { subject, Nom, Prénom, classe, groupe, message } = req.body;

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
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Nom:</strong> ${Nom}</p>
          <p style="font-size: 16px; margin-bottom: 10px;"><strong>Prénom:</strong> ${Prénom}</p>
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
