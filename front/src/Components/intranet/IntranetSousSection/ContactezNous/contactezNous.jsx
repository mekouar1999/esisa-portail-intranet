import React, { useState } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import './ContactezNous.css'; // Importation du fichier CSS
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactezNous = () => {
  const [formData, setFormData] = useState({
    subject: '',
    nom: '',
    prenom: '',
    classe: '',
    groupe: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Place your form submission logic here
    console.log(formData);
  };

  return (


    <>


    <div className="centered-content">
      <h2 className="title">Contact ESISA SUPPORT</h2>
      <p className="description">
        Service disponible 24/24 7/7
      </p>
    </div>
    <div className="info-contact-container">
      <div className="response-time">ESISA est là pour répondre à vos questions et vous accompagner. Nous nous engageons à vous fournir une assistance rapide et efficace. N'hésitez pas à nous contacter pour toute demande ou préoccupation, nous sommes là pour vous aider.</div>
     
  
     
     
    
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
    id="nom"
    name="nom"
    placeholder="Nom"
    value={formData.nom}
    onChange={handleChange}
    className="input"
  />
</div>
<div className="form-group">
  <input
    type="text"
    id="prenom"
    name="prenom"
    placeholder="Prénom"
    value={formData.prenom}
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
  <button type="submit" className="button">Envoyer</button>
</div>
</form>
</div>


 
<div className="medias-contact-container">
  <div className="social-icons">
    <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer"><FaFacebook className="social-icon" /></a>
    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer"><FaTwitter className="social-icon" /></a>
    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer"><FaInstagram className="social-icon" /></a>
    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer"><FaLinkedin className="social-icon" /></a>
  </div>
</div>

     
     
    
 

</>
  );
};

export default ContactezNous;
