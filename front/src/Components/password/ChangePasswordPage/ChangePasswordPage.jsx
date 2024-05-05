import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './ChangePasswordPage.css'; 

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const { token } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://esisa-portail-intranet-back.vercel.app/api/user/reset-Password/${token}`, formData)
      .then(response => {
        toast.success('Mot de passe changé avec succès !'); // Afficher la notification de succès
      })
      .catch(error => {
        if (error.response) {
          // La requête a été faite et le serveur a répondu avec un code d'erreur
          const responseData = error.response.data;
          if (responseData.status === "fail") {
            // Cas où l'utilisateur n'est pas trouvé
            setError(responseData.message);
          } else {
            // Gestion d'autres erreurs du serveur
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
  };

  return (
    <div className="Container">
      <div className="ResetPasswordContainer">
        <form className="ResetPasswordForm" onSubmit={handleSubmit}>
          <h1 className="Title">Changer le mot de passe</h1>
          <div className="FormGroup">
            <label htmlFor="password" className="Label">Nouveau mot de passe :</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="Input"
              required
            />
          </div>
          <div className="FormGroup">
            <label htmlFor="confirmPassword" className="Label">Confirmer le nouveau mot de passe :</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="Input"
              required
            />
          </div>
          <button type="submit" className="Button">Changer le mot de passe</button>
          {error && <p className="Message error">{error}</p>}
        </form>
      </div>
      <ToastContainer /> {/* Container pour les notifications */}
    </div>
  );
}

export default ChangePasswordPage;
