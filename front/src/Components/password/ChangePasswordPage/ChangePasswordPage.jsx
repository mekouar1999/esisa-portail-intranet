import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Importer le hook useParams
import './ChangePasswordPage.css'; 

function ChangePasswordPage() {
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Récupérer le token de l'URL

  useEffect(() => {
    console.log("Token:", token); // Log du token
  }, [token]); // Effectuer le log lorsque le token change

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4000/api/user/reset-Password/${token}`, formData)
    .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        // Gérer les erreurs ici
        console.error(error);
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
          {message && <p className={error ? 'Message error' : 'Message'}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default ChangePasswordPage;
