import React, { useState } from 'react';
import './ContactezNous.css'; // Importation du fichier CSS

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
    <div className="contact-container">
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">Sujet:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="classe">Classe:</label>
          <input
            type="text"
            id="classe"
            name="classe"
            value={formData.classe}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="groupe">Groupe:</label>
          <input
            type="text"
            id="groupe"
            name="groupe"
            value={formData.groupe}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="textarea"
          ></textarea>
        </div>
        <button type="submit" className="button">Envoyer</button>
      </form>
    </div>
  );
};

export default ContactezNous;
