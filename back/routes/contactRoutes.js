const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const multer = require('multer');
const upload = multer();

// Initialize the counter
function generateRandomId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

// Exemple d'utilisation
const randomId = generateRandomId(10); // Génère une chaîne aléatoire de longueur 10
console.log(randomId); // Affiche le nouvel identifiant aléatoire

router.post('/info', upload.none(), async (req, res) => {
  try {
    console.log('Requête POST reçue avec les données suivantes :', req.body);

    const { nom, prenom, email, tel, baccalaureat, filiere, maths, genre } = req.body;

    // Affichez les valeurs reçues pour déboguer
    console.log('Nom :', nom);
    console.log('Prénom :', prenom);
    console.log('Email :', email);
    console.log('Téléphone :', tel);
    console.log('Baccalauréat :', baccalaureat);
    console.log('Filière :', filiere);
    console.log('Moyenne Générale :', maths);
    console.log('Genre :', genre);

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
      to: `${process.env.MAIL_ID}, ${email}`, // Send to both the receiver and the person who submitted the form
      subject: `ESISA - Demande de Pré inscription #${randomId}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; background-color: #f9f9f9; padding: 20px; border-radius: 8px;">
          <h4 style="color: #007bff; margin-bottom: 20px;">Demande de pré Inscription #${randomId}</h4>
      
                <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <p style="font-size: 20px; text-align:center; margin-bottom: 10px;"><strong>Informations transmises :</strong></p>

            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Nom:</strong> ${nom}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Prénom:</strong> ${prenom}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Baccalauréat:</strong> ${baccalaureat}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Filière:</strong> ${filiere}</p>
            <p style="font-size: 16px; margin-bottom: 10px;"><strong>Moyenne Générale:</strong> ${maths}</p>
            <p style="font-size: 16px; margin-bottom: 0;"><strong>Email:</strong> ${email}</p>
            <p style="font-size: 16px; margin-bottom: 0;"><strong>Téléphone:</strong> ${tel}</p>
            <p style="font-size: 16px; margin-bottom: 0;"><strong>Genre:</strong> ${genre}</p>
          </div>
          <h6 style="color: #007bff; margin-bottom: 20px;">
          Nous vous remercions de votre demande. Celle-ci sera examinée par le directeur pédagogique. 
          Conformément aux normes universitaires de rigueur, nous nous engageons à vous fournir une réponse par rapport à votre demande dans un délai de 48 heures. 
      </h6>


      <h6 style="color: #007bff; text-align:center;  margin-top: 50px; margin-bottom: 20px;">
      COPYRIGHT © 2024 ESISA - TOUS DROITS RÉSERVÉS
  </h6>
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
    const { subject, Nom, Prénom, classe, groupe, message, email } = req.body;

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
      to: `${process.env.MAIL_ID}, ${email}`, // Send to both the receiver and the person who submitted the form
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
