import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './resetPassword.css'; 

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:4000/api/user/forgot-Password-Token', formData)
      .then(response => {
        const { token } = response.data;
        toast.success('Réinitialisation du mot de passe réussie !'); // Afficher la notification de succès
        navigate("/login");
      })
      .catch(error => {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'erreur
          const responseData = error.response.data;
          if (responseData.message === "User not found with this email") {
            setError("Utilisateur introuvable avec cet e-mail.");
          } else {
            setError('Une erreur s\'est produite lors de la réinitialisation du mot de passe.');
          }
        } else if (error.request) {
          // La requête a été faite mais aucune réponse n'a été reçue
          console.error(error.request);
          setError('Aucune réponse du serveur.');
        } else {
          // Une erreur s'est produite lors de la configuration de la requête
          console.error('Error', error.message);
          setError('Une erreur s\'est produite lors de la configuration de la requête.');
        }
      });
  }

  return (
    <div className="Container">
      <div className="ResetPasswordContainer">
        <form className="ResetPasswordForm" onSubmit={handleSubmit}>
          <h1 className="Title">Réinitialisation du mot de passe</h1>
          <div className="FormGroup">
            <label htmlFor="email" className="Label">Adresse e-mail :</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="Input"
              required
            />
          </div>
          <button type="submit" className="Button">Réinitialiser</button>
          {error && <p className="Message error">{error}</p>}
        </form>
      </div>
      <ToastContainer /> {/* Container pour les notifications */}
    </div>
  );
}

export default ResetPassword;
