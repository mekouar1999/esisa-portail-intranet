import React, { useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import axios from "axios";
import "./ContactezNous.css"; // Importation du fichier CSS

const ContactezNous = () => {
  const [formData, setFormData] = useState({
    subject: "",
    Nom: "",
    Prénom: "",
    classe: "",
    groupe: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
         "https://esisa-portail-intranet-back.vercel.app/contact",
       // "http://localhost:4000/contact",

        formData
      );

      console.log("Réponse du serveur:", response.data);
      setSuccessMessage("Message transmis avec succès!");
      setFormData({
        subject: "",
        Nom: "",
        Prénom: "",
        classe: "",
        groupe: "",
        message: "",
      });
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire:", error);
      alert(
        "Une erreur est survenue lors de la soumission du formulaire. Veuillez réessayer."
      );
    }
  };

  return (
    <>
      <div className="centered-content">
        <h2 className="title">Contact ESISA SUPPORT</h2>
        <p className="description">Service disponible 24/24 7/7</p>
      </div>
      <div className="info-contact-container">
        <div className="response-time">
          ESISA est là pour répondre à vos questions et vous accompagner. Nous
          nous engageons à vous fournir une assistance rapide et efficace.
          N'hésitez pas à nous contacter pour toute demande ou préoccupation,
          nous sommes là pour vous aider.
        </div>
      </div>
      <div className="info-contact-container">
        <div className="modal-header">
          <FaEnvelope className="contact-icon" />
          <h2>Contactez-nous</h2>
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Sujet"
              value={formData.subject}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="Nom"
              name="Nom"
              placeholder="Nom"
              value={formData.Nom}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="Prénom"
              name="Prénom"
              placeholder="Prénom"
              value={formData.Prénom}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="classe"
              name="classe"
              placeholder="Classe"
              value={formData.classe}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="groupe"
              name="groupe"
              placeholder="Groupe"
              value={formData.groupe}
              onChange={handleChange}
              className="input"
            />
          </div>
          <div className="form-group">
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="textarea"
            ></textarea>
          </div>
          <div className="modal-buttons">
            <button type="submit" className="button">
              Envoyer
            </button>
          </div>
        </form>
        {successMessage && <div className="toast">{successMessage}</div>}
      </div>
      <div className="medias-contact-container">
        <div className="social-icons">
          <a
            href="https://web.facebook.com/profile.php?id=100069321947366"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="social-icon" />
          </a>
          <a
            href="https://www.youtube.com/@esisafesofficiel3275"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/esisa.ac.ma/?hl=fr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/school/esisa/mycompany/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="social-icon" />
          </a>
        </div>
      </div>

      <br />
    </>
  );
};

export default ContactezNous;
